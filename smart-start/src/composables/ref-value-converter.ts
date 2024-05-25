import { Ref } from "vue";

export function useRefValueConveter() {
    function convertRefToFloat(ref: Ref<string>): number | undefined {
        const value = ref.value
        if (value === '') return undefined
        const parsed = parseFloat(value.replace(',', '.'))
        return Number.isNaN(parsed) ? undefined : parsed
    }

    return { convertRefToFloat }
}