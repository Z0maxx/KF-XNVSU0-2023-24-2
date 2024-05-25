import { FetchError, FormIdea, Idea, IdeaLLP, Validations } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { crudStore } from './crud-store'

const model = 'Idea'

export const useIdeaStore = defineStore(model, () => {
    const ideaValidations = ref<Validations | undefined>(undefined)
    const crud = crudStore()
    const { getItem, getItems, createItem, updateItem, deleteItem } = crud
   
    async function setIdeaValidations() {
        if (ideaValidations.value !== undefined) return

        createIdea({
            id: '',
            title: '',
            description: '',
            price: 0,
            priceUnit: ''
        }).catch((err: FetchError) => {
            if ('errors' in err && err.status === 400) {
                ideaValidations.value = err.errors
            }
            else {
                throw err
            }
        })
    }

    async function getIdea(id: string) {
        return await getItem<IdeaLLP>(model, id)
    }

    async function getIdeas() {
        return await getItems<Idea>(model)
    }

    async function createIdea(idea: FormIdea) {
        return await createItem(model, idea)
    }

    async function updateIdea(idea: Idea) {
        return await updateItem(model, idea)
    }

    async function deleteIdea(idea: Idea) {
        return await deleteItem(model, idea)
    }

    return {
        ideaValidations,
        setIdeaValidations,
        getIdea,
        getIdeas,
        createIdea,
        updateIdea,
        deleteIdea
    }
})