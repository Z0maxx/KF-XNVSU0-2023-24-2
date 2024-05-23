import { Idea } from '@/types'
import { defineStore, storeToRefs } from 'pinia'
import { useAuthStore } from './auth'
import { ref } from 'vue'

const api = 'https://localhost:7256/Api/'

export const useIdeaStore = defineStore('Idea', () => {
    const ideas = ref<Array<Idea>>([])
    const auth = useAuthStore()
    const { headersWithBearer } = storeToRefs(auth)

    async function getIdea(id: string) {
        return await fetch(api + 'GetIdea/' + id, {
            method: 'get',
            headers: headersWithBearer.value
        })
    }

    async function getIdeas() {
        ideas.value = []
        const res = await fetch(api + 'GetIdeas')
        
        ideas.value = await res.json()
    }

    async function createIdea(idea: Idea) {
        await fetch(api + 'CreateIdea', {
            method: 'post',
            headers: headersWithBearer.value,
            body: JSON.stringify(idea)
        })
    }

    async function updateIdea(idea: Idea) {
        await fetch(api + 'UpdateIdea/' + idea.id, {
            method: 'put',
            headers: headersWithBearer.value,
            body: JSON.stringify(idea)
        }) 
    }

    async function deleteIdea(id: string) {
        await fetch(api + 'DeleteIdea/' + id, {
            method: 'delete',
            headers: headersWithBearer.value,
        })
    }

    return {
        ideas,
        getIdea,
        getIdeas,
        createIdea,
        updateIdea,
        deleteIdea
    }
})