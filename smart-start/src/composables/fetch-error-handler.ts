import { useToastStore } from "@/stores/toast"
import { Errors, FetchError, FetchErrorHandlerOptions, StatusMessage } from "@/types"
import { usePageToastMessages } from "./page-toast-messages"
import { useValidation } from "./validation"

export function useFetchErrorHandler() {
    const toast = useToastStore()
    const { showDanger } = toast

    const pageToastMessages = usePageToastMessages()
    const { showDefaultError, showConnectionError } = pageToastMessages

    const validation = useValidation()
    const { setErrors } = validation

    function handleFetchErrorWithOptions(fetchError: FetchError, options: FetchErrorHandlerOptions) {
        if ('status' in fetchError) {
            let statusMessage: string | undefined
            if (options?.statusMessages) {
                statusMessage = options.statusMessages.find(m => m.status === fetchError.status)?.message
            }
            if ('errors' in fetchError && fetchError.status === 400 && options?.errors) {
                setErrors(options.errors, fetchError.errors)
            }
            else if (statusMessage) {
                showDanger(statusMessage)
            }
            else {
                showDefaultError(fetchError.status)
            }
        }
        else if ('message' in fetchError && fetchError.message) {
            showDanger(fetchError.message)
        }
        else if (Array.isArray(fetchError)) {
            showDanger(fetchError[0])
        }
        else {
            showConnectionError()
        }
    }

    function handleFetchError(fetchError: FetchError, statusMessages?: Array<StatusMessage>) {
        handleFetchErrorWithOptions(fetchError, { statusMessages })
    }

    function handleFormFetchError(fetchError: FetchError, errors: Errors) {
        handleFetchErrorWithOptions(fetchError, { errors })
    }

    return {
        handleFetchError,
        handleFormFetchError,
        handleFetchErrorWithOptions
    }
}