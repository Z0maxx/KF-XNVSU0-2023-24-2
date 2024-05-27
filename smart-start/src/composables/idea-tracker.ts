import { useIdeaStore } from "@/stores/idea";
import { IdeaLLP } from "@/types";
import { Ref } from "vue";
import { useFetchErrorHandler } from "./fetch-error-handler";
import { useSignalR } from "./signal-r";

export function useIdeaTracker() {
    const signalr = useSignalR()
    const { models, onCreatedLLP, onUpdatedLLP, onChanged, onDeleted } = signalr
    const model = models.idea

    const store = useIdeaStore()
    const { getIdea } = store

    const errorHandler = useFetchErrorHandler()
    const { handleFetchError } = errorHandler

    function trackIdeaLLP(ideaRef: Ref<IdeaLLP | undefined>) {
        function ideaUpdated(idea: IdeaLLP) {
            if (ideaRef.value?.id !== idea.id) return

            ideaRef.value = idea
        }
        
        function ideaChanged(id: string) {
            if (ideaRef.value?.id !== id) return

            getIdea(id).then((res) => {
                ideaUpdated(res)
            }).catch(handleFetchError)
        }

        function ratingChanged(id: string) {
            const ratings = ideaRef.value?.ratings
            const idea = ideaRef.value
            if (ratings?.some(r => r.id == id) && idea) {
                ideaChanged(idea.id)
            }
        }

        function commentChanged(id: string) {
            const comments = ideaRef.value?.comments
            const idea = ideaRef.value
            if (comments?.some(c => c.id == id) && idea) {
                ideaChanged(idea.id)
            }
        }

        onUpdatedLLP(ideaUpdated, model)
        onChanged(ideaChanged, model)
        onChanged(ratingChanged, models.rating)
        onChanged(commentChanged, models.comment)
    }

    function trackIdeasLLP(ideasRef: Ref<Array<IdeaLLP>>) {
        function ideaUpdated(idea: IdeaLLP) {
            ideasRef.value.splice(ideasRef.value.findIndex(i => i.id === idea.id), 1, idea)
        }
        
        function ideaCreated(idea: IdeaLLP) {
            ideasRef.value.push(idea)
        }
        
        function ideaDeleted(id: string) {
            ideasRef.value.splice(ideasRef.value.findIndex(i => i.id === id), 1)
        }
        
        function ideaChanged(id: string) {
            getIdea(id).then((res) => {
                ideaUpdated(res)
            }).catch(handleFetchError)
        }

        onCreatedLLP(ideaCreated, model)
        onUpdatedLLP(ideaUpdated, model)
        onChanged(ideaChanged, model)
        onDeleted(ideaDeleted, model)
    }

    function trackIdeasLLPBy(ideasRef: Ref<Array<IdeaLLP>>, by: string) {


        function ideaUpdated(idea: IdeaLLP) {
            if (by !== idea.ownerId) return

            const ideas = ideasRef.value
            ideas.splice(ideas.findIndex(i => i.id === idea.id), 1, idea)
        }
        
        function ideaCreated(idea: IdeaLLP) {
            if (by !== idea.ownerId) return

            const ideas = ideasRef.value
            ideas.push(idea)
        }
        
        function ideaDeleted(id: string) {
            const ideas = ideasRef.value
            const idx = ideas.findIndex(i => i.id === id)
            if (idx === -1) return

            ideas.splice(idx, 1)
        }
        
        function ideaChanged(id: string) {
            const ideas = ideasRef.value
            const idx = ideas.findIndex(i => i.id === id)
            if (idx === -1) return

            getIdea(id).then((res) => {
                ideaUpdated(res)
            }).catch(handleFetchError)
        }

        onCreatedLLP(ideaCreated, model)
        onUpdatedLLP(ideaUpdated, model)
        onChanged(ideaChanged, model)
        onDeleted(ideaDeleted, model)
    }

    return {
        trackIdeaLLP,
        trackIdeasLLP,
        trackIdeasLLPBy
    }
 }