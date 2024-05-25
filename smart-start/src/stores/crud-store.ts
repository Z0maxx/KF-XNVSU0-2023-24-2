import { TableModel } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./auth";

const api = 'https://localhost:7256/Api'

async function convertToJson(res: Response): Promise<object> {
    let json
    try {
        json = await res.json()
    }
    catch {
        throw res
    }
    if (!res.ok) throw json
    return json
}

async function checkForError(res: Response): Promise<void> {
    if (!res.ok) await convertToJson(res)
}

export const crudStore = defineStore('Crud', () => {
    const auth = useAuthStore()
    const { headersWithBearer } = storeToRefs(auth)

    async function getItem<T extends TableModel>(model: string, id: string) {
        const res = await fetch(`${api}/Get${model}/${id}`)
        return await convertToJson(res) as T
    }

    async function getItems<T extends TableModel>(model: string) {
        const res = await fetch(`${api}/Get${model}s`)
        return await convertToJson(res) as Array<T>
    }

    async function createItem<T extends TableModel>(model: string, item: T) {
        const res = await fetch(`${api}/Create${model}`, {
            method: 'post',
            headers: headersWithBearer.value,
            body: JSON.stringify(item)
        })

        await checkForError(res)
    }

    async function updateItem<T extends TableModel>(model: string, item: T) {
        const res = await fetch(`${api}/Update${model}/${item.id}`, {
            method: 'put',
            headers: headersWithBearer.value,
            body: JSON.stringify(item)
        })

        await checkForError(res)
    }

    async function submitItem<T extends TableModel>(model: string, item: T) {
        const res = await fetch(`${api}/Submit${model}/`, {
            method: 'put',
            headers: headersWithBearer.value,
            body: JSON.stringify(item)
        })

        await checkForError(res)
    }

    async function deleteItem<T extends TableModel>(model: string, item: T) {
        const res = await fetch(`${api}/Delete${model}/${item.id}`, {
            method: 'delete',
            headers: headersWithBearer.value,
        })

        await checkForError(res)
    }

    return {
        getItem,
        getItems,
        createItem,
        updateItem,
        submitItem,
        deleteItem
    }
})