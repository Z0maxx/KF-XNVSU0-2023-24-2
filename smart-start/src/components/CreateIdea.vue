<template>
    <div>
        <div class="mx-auto max-w-xl">
            <h1 class="text-3xl sm:text-5xl font-medium">Create Idea</h1>
            <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4">
                <div class="relative">
                    <label for="title" class="block">Title<span v-if="titleRequired" class="text-cyan-400 text-xl">*</span></label>
                    <input v-model="title" id="title" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                    <div v-for="error in titleErrors" :key="error">
                        <p class="text-cyan-400">{{ error }}</p>
                    </div>
                </div>
                <div class="mt-4 relative">
                    <label for="description" class="block">Description<span v-if="descriptionRequired" class="text-cyan-400 text-xl">*</span></label>
                    <textarea v-model="description" id="description" rows="3" class="w-full px-1 pb-1 pt-3 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500"></textarea>
                    <span class="absolute left-1 top-7 text-xs">{{ descriptionLength }}</span>
                    <div v-for="error in descriptionErrors" :key="error">
                        <p class="text-cyan-400">{{ error }}</p>
                    </div>
                </div>
                <div class="mt-4 relative">
                    <label for="price" class="block">Price<span v-if="priceRequired" class="text-cyan-400 text-xl">*</span></label>
                    <input type="number" v-model="price" id="price" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                    <div v-for="error in priceErrors" :key="error">
                        <p class="text-cyan-400">{{ error }}</p>
                    </div>
                </div>
                <div class="mt-4 relative">
                    <label for="price-unit" class="block">Price Unit<span v-if="priceUnitRequired" class="text-cyan-400 text-xl">*</span></label>
                    <select v-model="priceUnit" id="price-unit" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                        <option value="" disabled class="font-medium text-cyan-400">Select an option</option>
                        <option>Piece</option>
                        <option>Day</option>
                    </select>
                    <div v-for="error in priceUnitErrors" :key="error">
                        <p class="text-cyan-400">{{ error }}</p>
                    </div>
                </div>
                <button @click="tryCreateIdea" class="p-2 mt-6 w-full flex gap-1 justify-center bg-lime-600 hover:bg-lime-700 border-2 border-lime-800 font-medium rounded">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clip-rule="evenodd" />
                    </svg>
                    <span>Create Idea</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useFetchErrorHandler } from '@/composables/fetch-error-handler';
import { useValidation } from '@/composables/validation';
import { useIdeaStore } from '@/stores/idea';
import { useToastStore } from '@/stores/toast';
import { Errors, FetchError, FormIdea, Requireds } from '@/types';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';

const title = ref('')
const description = ref('')
const price = ref<number | undefined>(undefined)
const priceUnit = ref('')

const titleErrors = ref<Array<string>>([])
const descriptionErrors = ref<Array<string>>([])
const priceErrors = ref<Array<string>>([])
const priceUnitErrors = ref<Array<string>>([])
const errors: Errors = {
    title: titleErrors,
    description: descriptionErrors,
    price: priceErrors,
    priceUnit: priceUnitErrors
}

const titleRequired = ref(false)
const descriptionRequired = ref(false)
const priceRequired = ref(false)
const priceUnitRequired = ref(false)
const requireds: Requireds = {
    title: titleRequired,
    description: descriptionRequired,
    price: priceRequired,
    priceUnit: priceUnitRequired
}

const descriptionLength = ref('')

const store = useIdeaStore()
const { ideaValidations } = storeToRefs(store)
const { setIdeaValidations, createIdea } = store

const validation = useValidation()
const {
    resetErrors,
    setTextLength,
    setRequireds,
    setValidationAttributes,
    isModelValid
} = validation

const toast = useToastStore()
const { showSuccess } = toast

const errorHandler = useFetchErrorHandler()
const { handleFetchError, handleFormFetchError } = errorHandler

function tryCreateIdea() {
    const model: FormIdea = {
        id: '',
        title: title.value,
        description: description.value,
        price: price.value,
        priceUnit: priceUnit.value
    }

    if (isModelValid(errors, model)) {
        resetErrors(errors)
        createIdea(model).then(() => {
            title.value = ''
            description.value = ''
            price.value = undefined
            priceUnit.value = ''
            showSuccess('Created Idea successfully')
        }).catch((err: FetchError) => {
            handleFormFetchError(err, errors)
        })
    }
}

onMounted(() => {
    setIdeaValidations().then(() => {
        setValidationAttributes(ideaValidations.value)
        setRequireds(requireds)
    }).catch(handleFetchError)
})

watch(description, (value) => {
    setTextLength(descriptionLength, value, 'description')
})
</script>