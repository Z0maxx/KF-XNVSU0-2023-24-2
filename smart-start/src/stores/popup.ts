import { defineStore } from "pinia";

let resolve: (value: (boolean | PromiseLike<boolean>)) => void

export const usePopupStore = defineStore({
    id: 'Popup',
    state: () => ({
        title: '' as string,
        description: '' as string,
        displayed: false as boolean
    }),

    actions: {
        async askConfirmation(title: string, description: string): Promise<boolean> {
            this.title = title
            this.description = description
            this.displayed = true

            return new Promise((res) => {
                resolve = res
            })
        },

        cancel() {
            resolve(false)
            this.displayed = false
        },

        confirm() {
            resolve(true)
            this.displayed = false
        }
    }
})