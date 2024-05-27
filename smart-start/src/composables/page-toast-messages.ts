import { useToastStore } from "@/stores/toast"

export function usePageToastMessages() {
    const toast = useToastStore()
    const { showAlert, showDanger } = toast

    function showDefaultError(statusCode: number) {
        showAlert('Something went wrong: status ' + statusCode)
    }
    
    function showConnectionError() {
        showDanger('Failed to connect to the server')
    }

    return {
        showDefaultError,
        showConnectionError
    }
}