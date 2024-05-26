import { defineStore } from "pinia"
import { crudStore } from "./crud-store"
import { SiteUser, SiteUserLLP } from "@/types"

const model = 'SiteUser'

export const useSiteUserStore = defineStore(model, () => {
    const crud = crudStore()
    const { getItem } = crud

    async function getSiteUser(id: string) {
        return await getItem<SiteUser>(model, id)
    }

    async function getSiteUserActivities(id: string) {
        return await getItem<SiteUserLLP>('SiteUserActivities', id)
    }

    return {
        getSiteUser,
        getSiteUserActivities
    }
})