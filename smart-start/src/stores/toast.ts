import { ToastType } from "@/types";
import { defineStore } from "pinia";

let timeout = 0

export const useToastStore = defineStore({
    id: 'Toast',
    state: () => ({
        message: '' as string,
        displayed: false as boolean,
        type: 'success' as ToastType
    }),

    actions: {
        showMessage(message: string, type: ToastType) {
            this.message = message
            this.type = type
            this.displayed = true
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                this.close()
            }, 5000)
        },

        showSuccess(message: string) {
            this.showMessage(message, 'success')
        },

        showAlert(message: string) {
            this.showMessage(message, 'alert')
        },

        showDanger(message: string) {
            this.showMessage(message, 'danger')
        },

        close() {
            this.displayed = false
        }
    }
})