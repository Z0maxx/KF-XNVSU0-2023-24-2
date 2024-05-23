import { Rating } from '@/types'
import { defineStore } from 'pinia'
import { crudStore } from './crud-store'

const model = 'Rating'

export const useRatingStore = defineStore(model, () => {
    const crud = crudStore()
    const { submitItem, deleteItem } = crud

    async function submitRating(rating: Rating) {
        return await submitItem(model, rating)
    }

    async function deleteRating(rating: Rating) {
        return await deleteItem(model, rating)
    }

    return {
        submitRating,
        deleteRating
    }
})