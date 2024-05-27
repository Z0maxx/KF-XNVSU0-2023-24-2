import { useAuthStore } from "@/stores/auth";
import { Comment } from "@/types";
import { Ref } from "vue";
import { useSignalR } from "./signal-r";

export function useCommentTracker() {
    const signalr = useSignalR()
    const { models, onCreated, onUpdated, onDeleted } = signalr
    const model = models.comment

    const auth = useAuthStore()
    const { currentUser } = auth

    function trackComment(commentRef: Ref<Comment | undefined>, hasCommentRef: Ref<boolean>) {
        function commentSubmitted(comment: Comment) {
            if (currentUser?.id !== comment.ownerId) return

            commentRef.value = comment
            hasCommentRef.value = true
        }

        function commentDeleted(id: string) {
            const comment = commentRef.value
            if (!comment || comment.id !== id) return

            comment.id = ''
            comment.message = ''
            hasCommentRef.value = false
        }

        onCreated(commentSubmitted, model)
        onUpdated(commentSubmitted, model)
        onDeleted(commentDeleted, model)
    }

    return {
        trackComment
    }
}