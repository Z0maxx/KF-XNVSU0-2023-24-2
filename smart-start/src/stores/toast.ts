import { ToastType } from "@/types";
import { defineStore } from "pinia";
import { ref } from "vue";

let timeout = 0

export const useToastStore = defineStore('Toast', () => {
    const message = ref<string>('')
    const displayed = ref<boolean>(false)
    const type = ref<ToastType>('success')

    function setMessage(newMessage: string, newType: ToastType) {
        message.value = newMessage
        type.value = newType
        displayed.value = true
        clearTimeout(timeout)
        timeout = setTimeout(() => {
            close()
        }, 5000)
    }

    function showSuccess(message: string) {
        setMessage(message, 'success')
    }

    function showAlert(message: string) {
        setMessage(message, 'alert')
    }

    function showDanger(message: string) {
        setMessage(message, 'danger')
    }

    function close() {
        displayed.value = false
    }

    return {
        message,
        displayed,
        type,
        setMessage,
        showSuccess,
        showAlert,
        showDanger,
        close
    }
})