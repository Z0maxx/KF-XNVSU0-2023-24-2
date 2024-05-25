import { Errors, Requireds, Validations } from "@/types";

export function useValidation() {
    function isRequired(validations?: Array<string>) {
        if (!validations) return false
    
        return validations.some(v => v.includes('required'))
    }
    
    function setRequiredFields(requireds: Requireds, validations: Validations | undefined) {
        if (!validations) return
    
        Object.keys(requireds).forEach(field => {
            requireds[field].value = isRequired(validations[field])
        })
    }
    
    function setErrors(errors: Errors, validations: Validations) {
        Object.keys(errors).forEach(field => {
            if (validations[field]) {
                errors[field].value = validations[field].map(error => convertError(error))
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
            if (parseFloat(word)) {
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
                    return `Field must be between ${min} and ${max} characters`
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

    return {
        isRequired,
        setRequiredFields,
        setErrors,
        resetErrors,
        convertError
    }
}