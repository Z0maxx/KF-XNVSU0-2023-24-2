import { TableModel } from "@/types";
import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./auth";

const api = 'https://localhost:7256/Api'

export const crudStore = defineStore('Crud', () => {
    const auth = useAuthStore()
    const { headersWithBearer } = storeToRefs(auth)

    async function getItem<T extends TableModel>(model: string, id: string) {
        const res = await fetch(`${api}/Get${model}/${id}`, {
            method: 'get',
            headers: headersWithBearer.value
        })

        return await res.json() as T
    }

    async function getItems<T extends TableModel>(model: string) {
        const res = await fetch(`${api}/Get${model}s`)
        return await res.json() as Array<T>
    }

    async function createItem<T extends TableModel>(model: string, item: T) {
        await fetch(`${api}/Create${model}`, {
            method: 'post',
            headers: headersWithBearer.value,
            body: JSON.stringify(item)
        })
    }

    async function updateItem<T extends TableModel>(model: string, item: T) {
        await fetch(`${api}/Update${model}/${item.id}`, {
            method: 'put',
            headers: headersWithBearer.value,
            body: JSON.stringify(item)
        })
    }

    async function submitItem<T extends TableModel>(model: string, item: T) {
        await fetch(`${api}/Submit${model}/`, {
            method: 'put',
            headers: headersWithBearer.value,
            body: JSON.stringify(item)
        })
    }

    async function deleteItem<T extends TableModel>(model: string, item: T) {
        await fetch(`${api}/Delete${model}/${item.id}`, {
            method: 'delete',
            headers: headersWithBearer.value,
        })
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