import { Errors, RequiredAttribute, Requireds, ValidationAttribute, ValidationAttributes, Validations } from "@/types";
import { Ref } from "vue";

export function useValidation() {
    let validationAttributes: ValidationAttributes

    function setRequireds(requireds: Requireds) {
        if (!validationAttributes) return

        Object.keys(requireds).forEach(field => {
            if (validationAttributes[field].some(v => v.type === 'required')) {
                requireds[field].value = true
            }
        })
    }

    function setErrors(errors: Errors, validations: Validations) {
        Object.keys(errors).forEach(field => {
            if (validations[field]) {
                const Field = field.charAt(0).toUpperCase() + field.slice(1)
                errors[field].value = validations[Field].map(error => convertError(error))
            }
            else {
                errors[field].value = []
            }
        })
    }

    function resetErrors(errors: Errors) {
        Object.keys(errors).forEach(field => {
            errors[field].value = []
        })
    }

    function convertError(error: string) {
        if (error.includes('required')) {
            return 'Field is required'
        }

        const split = error.replace('.', '').split(' ')
        let max = ''
        let min = ''
        split.forEach(word => {
            if (parseFloat(word.replace(',', '.'))) {
                if (max === '') max = word
                else {
                    min = max
                    max = word
                }
            }
        })
        if (max !== '') {
            if (error.includes('string')) {
                if (min === '') {
                    return `Field must be maximum ${max} characters long`
                }
                else {
                    return `Field must be between ${min} and ${max} characters long`
                }
            }
            else if (error.includes('')) {
                if (min === '') {
                    return `Field must be maximum ${max}`
                }
                else {
                    return `Field must be between ${min} and ${max}`
                }
            }
        }

        return error
    }

    function convertToValidationAttribute(validation: string): ValidationAttribute {
        if (validation.includes('required')) {
            return {
                type: 'required',
                message: 'Field is required',
                required: true
            }
        }

        const split = validation.replace('.', '').split(' ')
        let max = ''
        let min = ''
        split.forEach(word => {
            if (parseFloat(word.replace(',', '.'))) {
                if (max === '') max = word
                else {
                    min = max
                    max = word
                }
            }
        })

        const attribute: ValidationAttribute = {
            type: '',
            message: '',
            max: 0
        }

        if (max !== '') {
            attribute.max = parseFloat(max.replace(',', '.'))
        }
        if (min != '') {
            attribute.min = parseFloat(min.replace(',', '.'))
        }
        if (validation.includes('string')) {
            attribute.type = 'string'
            if (attribute.min !== undefined) {
                attribute.message = `Field must be between ${min} and ${max} characters long`
            }
            else {
                attribute.message = `Field must be maximum ${max} characters long`
            }
        }
        else {
            attribute.type = 'number'
            if (attribute.min !== undefined) {
                attribute.message = `Field must be between ${min} and ${max}`
            }
            else {
                attribute.message = `Field must be maximum ${max}`
            }
        }

        return attribute
    }

    function setValidationAttributes(validations: Validations | undefined): ValidationAttributes {
        if (!validations) throw new Error('No Validations')

        const attributes: ValidationAttributes = {}
        Object.keys(validations).forEach(Field => {
            const field = Field.charAt(0).toLocaleLowerCase() + Field.slice(1)
            attributes[field] = validations[Field].map(v => {
                const attribute = convertToValidationAttribute(v)
                if (attribute.type === 'number') {
                    return [{ type: 'required', message: 'Field is required', required: true } as RequiredAttribute, attribute]
                }
                return [attribute]
            }).reduce((curr, acc) => curr.concat(acc), [])
        })
        validationAttributes = attributes
        return attributes
    }

    function isModelValid(errors: Errors, model: Record<string, unknown>): boolean {
        if (!validationAttributes) throw new Error('Validation Attributes not set')

        let valid = true
        Object.keys(errors).forEach(field => {
            const attributes = validationAttributes[field]
            const value = model[field]
            const failedValidations: Array<string> = []
            attributes.forEach(attribute => {
                if (attribute.type === 'required' && (value == undefined || value == null || value == '')) {
                    valid = false
                    failedValidations.push(attribute.message)
                }

                else if (attribute.type === 'string') {
                    if (typeof value !== 'string') throw new Error(`${field} not a string`)
                    if ('min' in attribute && attribute.min && (value.length < attribute.min || value.length > attribute.max)) {
                        valid = false
                        failedValidations.push(attribute.message)
                    }
                    else if ('max' in attribute && value.length > attribute.max) {
                        valid = false
                        failedValidations.push(attribute.message)
                    }
                }

                else if (attribute.type === 'number' && typeof value === 'number') {
                    if ('min' in attribute && attribute.min && (value < attribute.min || value > attribute.max)) {
                        valid = false
                        failedValidations.push(attribute.message)
                    }
                    else if ('max' in attribute && value > attribute.max) {
                        valid = false
                        failedValidations.push(attribute.message)
                    }
                }
            })
            errors[field].value = failedValidations
        })
        return valid
    }

    function setTextLength(textLength: Ref<string>, text: string, field: string) {
        if (!validationAttributes) throw new Error('Validation Attributes not set')

        const attribute = validationAttributes[field].find(v => v.type === 'string')
        const length = text.length
        if (attribute) {
            if ('min' in attribute && attribute.min && length < attribute.min) {
                textLength.value = `${length}/${attribute.min} minimum`
            }
            else if ('max' in attribute) {
                textLength.value = `${length}/${attribute.max} maximum`
            }
        }
    }

    return {
        isModelValid,
        setValidationAttributes,
        setRequireds,
        setErrors,
        setTextLength,
        resetErrors,
        convertError
    }
}