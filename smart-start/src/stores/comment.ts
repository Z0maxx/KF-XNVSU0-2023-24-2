import { Comment } from '@/types'
import { defineStore } from 'pinia'
import { crudStore } from './crud-store'

const model = 'Comment'

export const useCommentStore = defineStore(model, () => {
    const crud = crudStore()
    const { submitItem, deleteItem } = crud

    async function submitComment(comment: Comment) {
        return await submitItem(model, comment)
    }

    async function deleteComment(comment: Comment) {
        return await deleteItem(model, comment)
    }

    return {
        submitComment,
        deleteComment
    }
})