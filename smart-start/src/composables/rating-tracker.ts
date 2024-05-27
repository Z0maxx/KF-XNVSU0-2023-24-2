import { useAuthStore } from "@/stores/auth";
import { Rating } from "@/types";
import { Ref } from "vue";
import { useSignalR } from "./signal-r";

export function useRatingTracker() {
    const signalr = useSignalR()
    const { models, onCreated, onUpdated, onDeleted } = signalr
    const model = models.rating

    const auth = useAuthStore()
    const { currentUser } = auth

    function trackRating(ratingRef: Ref<Rating | undefined>, hasRatingRef: Ref<boolean>) {
        function ratingSubmitted(rating: Rating) {
            if (currentUser?.id !== rating.ownerId) return

            ratingRef.value = rating
            hasRatingRef.value = true
        }

        function ratingDeleted(id: string) {
            const rating = ratingRef.value
            if (!rating || rating.id !== id) return
            
            rating.id = ''
            rating.ideaRating = 5
            rating.priceRating = 5
            hasRatingRef.value = false
        }

        onCreated(ratingSubmitted, model)
        onUpdated(ratingSubmitted, model)
        onDeleted(ratingDeleted, model)
    }

    return {
        trackRating
    }
}