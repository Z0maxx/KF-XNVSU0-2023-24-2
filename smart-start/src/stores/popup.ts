import { defineStore } from "pinia";
import { ref } from "vue";

let resolve: (value: (boolean | PromiseLike<boolean>)) => void

export const usePopupStore = defineStore('Popup', () => {
    const title = ref<string>('')
    const description = ref<string>('')
    const displayed = ref<boolean>(false)

    async function askConfirmation(newTitle: string, newDescription: string): Promise<boolean> {
        title.value = newTitle
        description.value = newDescription
        displayed.value = true

        return new Promise((res) => {
            resolve = res
        })
    }

    function cancel() {
        resolve(false)
        displayed.value = false
    }

    function confirm() {
        resolve(true)
        displayed.value = false
    }

    return {
        title,
        description,
        displayed,
        askConfirmation,
        cancel,
        confirm
    }
})