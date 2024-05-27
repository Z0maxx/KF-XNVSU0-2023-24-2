import { useSiteUserStore } from "@/stores/site-user";
import { Idea, SiteUser, SiteUserLLP } from "@/types";
import { Ref } from "vue";
import { useSignalR } from "./signal-r";

export function useSiteUserTracker() {
    const store = useSiteUserStore()
    const { getSiteUserActivities } = store

    const signalr = useSignalR()
    const { models, onUpdated, onUpdatedLLP, onChanged } = signalr
    const model = models.siteUser

    function trackUser(userRef: Ref<SiteUser | undefined>) {
        function userUpdated(user: SiteUser) {
            if (userRef.value?.id !== user.id) return

            userRef.value = user
        }

        onUpdated(userUpdated, model)
    }

    function trackUserLLP(userRef: Ref<SiteUserLLP | undefined>) {
        function userChanged(id: string) {
            if (userRef.value?.id !== id) return

            getSiteUserActivities(id).then((res) => {
                userUpdated(res)
            })
        }

        function userUpdated(user: SiteUserLLP) {
            if (userRef.value?.id !== user.id) return

            userRef.value = user
        }
        
        function ideaChanged(id: string) {
            const user = userRef.value
            const ideas = user?.ideas
            const userId = user?.id
            if (ideas?.findIndex(i => i.id === id) === -1 || !userId) return

            userChanged(user?.id)
        }

        function ideaUpdated(idea: Idea) {
            const ideaId = idea.id
            const user = userRef.value
            const ratings = user?.ratings
            const comments = user?.comments
            if ((ratings?.some(r => r.ideaId === ideaId) || comments?.some(c => c.ideaId === ideaId)) && user) {
                userChanged(user.id)
            }
        }

        onUpdatedLLP(userUpdated, model)
        onChanged(userChanged, model)
        onChanged(ideaChanged, models.idea)
        onUpdated(ideaUpdated, models.idea)
    }

    return {
        trackUser,
        trackUserLLP
    }
}