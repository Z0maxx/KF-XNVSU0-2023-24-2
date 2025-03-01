<template>
    <div>
        <div class="mx-auto max-w-xl">
            <h1 class="text-3xl sm:text-5xl font-medium">Edit Idea</h1>
            <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4">
                <div>
                    <label for="id" class="block">Id</label>
                    <input id="id" disabled class="w-full p-1 bg-emerald-700 border-emerald-800 border-2 rounded text-cyan-400" :value="idea?.id">
                </div>
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
                        <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                    </svg>
                    <span>Edit Idea</span>
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
import { Errors, FetchError, FormIdea, Idea, Requireds } from '@/types';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const title = ref('')
const description = ref('')
const price = ref<number | undefined>(0)
const priceUnit = ref('')
const idea = ref<Idea | undefined>(undefined)

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

const route = useRoute()
const id = route.params.id
if (typeof id !== 'string') throw new Error('No Id')

const store = useIdeaStore()
const { ideaValidations } = storeToRefs(store)
const { setIdeaValidations, updateIdea, getIdea } = store


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
    const instance = idea.value
    if (!instance) throw new Error('No Idea')

    const model: FormIdea = {
        id: instance.id,
        title: title.value,
        description: description.value,
        price: price.value,
        priceUnit: priceUnit.value
    }

    if (isModelValid(errors, model)) {
        resetErrors(errors)
        updateIdea(model).then(() => {
            showSuccess('Updated Idea successfully')
        }).catch((err: FetchError) => {
            handleFormFetchError(err, errors)
        })
    }
}

function setDefaultValues() {
    const instance = idea.value
    if (!instance) return

    title.value = instance.title
    description.value = instance.description
    price.value = instance.price
    priceUnit.value = instance.priceUnit
}

onMounted(() => {
    setIdeaValidations().then(() => {
        setValidationAttributes(ideaValidations.value)
        setRequireds(requireds)
        getIdea(id).then((res) => {
            idea.value = res
            setDefaultValues()
        }).catch(handleFetchError)
    }).catch(handleFetchError)
})

watch(description, (value) => {
    setTextLength(descriptionLength, value, 'description')
})
</script>