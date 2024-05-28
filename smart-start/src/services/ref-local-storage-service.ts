import { Ref } from "vue"

const refs: Record<string, Ref<unknown>> = { }

export function setRef(key: string, ref: Ref<unknown>) {
    refs[key] = ref
    const item = localStorage.getItem(key)
    ref.value = item ? JSON.parse(item) : undefined
}

export function setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value))
    refs[key].value = value
}

export function removeItem(key: string) {
    localStorage.removeItem(key)
    refs[key].value = undefined
}