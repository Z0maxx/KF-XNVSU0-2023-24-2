import { Idea, IdeaLLP } from '@/types'
import { defineStore } from 'pinia'
import { crudStore } from './crud-store'

const model = 'Idea'

export const useIdeaStore = defineStore(model, () => {
    const crud = crudStore()
    const { getItem, getItems, createItem, updateItem, deleteItem } = crud
   

    async function getIdea(id: string) {
        return await getItem<IdeaLLP>(model, id)
    }

    async function getIdeas() {
        return await getItems<Idea>(model)
    }

    async function createIdea(idea: Idea) {
        return await createItem(model, idea)
    }

    async function updateIdea(idea: Idea) {
        return await updateItem(model, idea)
    }

    async function deleteIdea(idea: Idea) {
        return await deleteItem(model, idea)
    }

    return {
        getIdea,
        getIdeas,
        createIdea,
        updateIdea,
        deleteIdea
    }
})