import { Ref } from "vue"

export function setRef(key: string, ref: Ref<unknown>) {
    const item = localStorage.getItem(key)
    ref.value = item ? JSON.parse(item) : undefined
}

export function setItem(key: string, value: unknown, ref: Ref<unknown>) {
    localStorage.setItem(key, JSON.stringify(value))
    ref.value = value
}

export function removeItem(key: string, ref: Ref<unknown>) {
    localStorage.removeItem(key)
    ref.value = undefined
}