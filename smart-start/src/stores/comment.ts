import { Comment, FetchError, Validations } from '@/types'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { crudStore } from './crud-store'

const model = 'Comment'

export const useCommentStore = defineStore(model, () => {
    const commentValidations = ref<Validations | undefined>(undefined)
    const crud = crudStore()
    const { submitItem, deleteItem } = crud

    async function setCommentValidations() {
        if (commentValidations.value !== undefined) return

        await submitComment({
            id: '',
            ideaId: '',
            ownerId: '',
            message: ''
        }).catch((err: FetchError) => {
            if ('errors' in err && err.status === 400) {
                commentValidations.value = err.errors
            }
            else {
                throw err
            }
        })
    }

    async function submitComment(comment: Comment) {
        return await submitItem(model, comment)
    }

    async function deleteComment(comment: Comment) {
        return await deleteItem(model, comment)
    }

    return {
        commentValidations,
        setCommentValidations,
        submitComment,
        deleteComment
    }
})