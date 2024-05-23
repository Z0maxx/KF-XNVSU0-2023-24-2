import { defineStore } from "pinia"
import { crudStore } from "./crud-store"
import { SiteUserLLP } from "@/types"

const model = 'SiteUser'

export const useSiteUserStore = defineStore(model, () => {
    const crud = crudStore()
    const { getItem } = crud

    async function getSiteUser(id: string) {
        return await getItem<SiteUserLLP>(model, id)
    }

    return { getSiteUser }
})