<template>
    <div class="my-4">
        <div class="p-2 bg-emerald-700 border-emerald-800 border-x-4 border-t-4 rounded-t-lg">
            <div class="flex flex-col sm:flex-row gap-2 justify-between">
                <router-link v-if="displayOwner" :to="'/activites/' + idea.ownerId" class="flex flex-wrap gap-2 text-yellow-400 hover:underline">
                    <div class="size-6 rounded-full overflow-hidden">
                        <img :src="'https://localhost:7256/api/GetProfilePicture/' + idea.ownerId">
                    </div>
                    <span class="font-medium">{{ idea.owner.firstName }} {{ idea.owner.lastName }}</span>
                </router-link>
                <h2 v-if="!displayOwner && displayTitle" class="text-xl font-bold">{{ idea.title }}</h2>
                <div v-if="currentUser?.id === idea.ownerId" class="size-6 relative">
                    <button @click="toggleMenu" class="rounded-full bg-lime-200 hover:bg-lime-300 size-6">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 text-lime-800">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 12.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5ZM12 18.75a.75.75 0 1 1 0-1.5.75.75 0 0 1 0 1.5Z" />
                        </svg>
                    </button>
                    <div v-show="showMenu" class="p-1 bg-lime-200 absolute rounded-md top-6 sm:right-0 font-medium">
                        <router-link :to="'/edit-idea/' + idea.id" class="flex gap-1 mb-2 text-blue-600 hover:underline">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
                            </svg>
                            <span>Edit</span>
                        </router-link>
                        <button @click="tryDelete(idea.id)" class="flex gap-1 text-red-600 hover:text-red-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z" clip-rule="evenodd" />
                            </svg>
                            <span>Delete</span>
                        </button>
                    </div>
                </div>
            </div>
            <h2 v-if="displayOwner && displayTitle" class="text-xl font-bold">{{ idea.title }}</h2>
            <div>
                <div>Idea: {{ idea.ideaRating }}</div>
                <div class="flex">
                    <svg v-for="_ in wholeStars(idea.ideaRating)" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" :fill="starColor(idea.ideaRating)" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <svg v-if="percentageStarFill(idea.ideaRating) > 0" xmlns="http://www.w3.org/2000/svg" stroke="black" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                        <defs>
                            <linearGradient id="star-percentage">
                                <stop :stop-color="starColor(idea.ideaRating)" :offset="percentageStarFill(idea.ideaRating) + '%'"></stop>
                                <stop stop-color="gray"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#star-percentage)" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <svg v-for="_ in emptyStars(idea.ideaRating)" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </div>
                <div>Price: {{ idea.priceRating }}</div>
                <div class="flex">
                    <svg v-for="_ in wholeStars(idea.priceRating)" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" :fill="starColor(idea.priceRating)" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <svg v-if="percentageStarFill(idea.priceRating) > 0" xmlns="http://www.w3.org/2000/svg" stroke="black" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                        <defs>
                            <linearGradient id="star-percentage">
                                <stop :stop-color="starColor(idea.priceRating)" :offset="percentageStarFill(idea.priceRating) + '%'"></stop>
                                <stop stop-color="gray"></stop>
                            </linearGradient>
                        </defs>
                        <path fill="url(#star-percentage)" stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                    <svg v-for="_ in emptyStars(idea.priceRating)" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                </div>
            </div>
        </div>
        <div class="p-2 bg-emerald-600 border-emerald-800 border-x-4">
            <p v-for="line in splitDescription(idea.description)" :key="line">{{ line }}</p>
        </div>
        <div class="p-2 font-medium bg-emerald-500 border-emerald-800 border-x-4 border-b-4 rounded-b-lg flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <div>Price: ${{ idea.price }} / {{ idea.priceUnit }}</div>
            <div class="px-2 py-1 flex flex-col sm:flex-row gap-2 bg-teal-200 text-teal-800 rounded-md size-max">
                <router-link v-if="displayDetails" :to="'/idea/' + idea.id" class="flex gap-1 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                    </svg>
                    <span>Details</span>
                </router-link>
                <router-link v-if="displayIdeasBy" :to="'/ideas-by/' + idea.ownerId" class="flex gap-1 hover:underline">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                        <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
                    </svg>
                    <span>Ideas By {{ idea.owner.firstName }} {{ idea.owner.lastName }}</span>
                </router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { defineProps, ref, toRefs } from 'vue';
import { usePageToastMessages } from '@/composables/page-toast-messages';
import { useRatingStarConverter } from '@/composables/rating-star-converter';
import { useAuthStore } from '@/stores/auth';
import { useIdeaStore } from '@/stores/idea';
import { usePopupStore } from '@/stores/popup';
import { useToastStore } from '@/stores/toast';
import { FetchError, Idea } from '@/types';
import { storeToRefs } from 'pinia';

const showMenu = ref(false)
const props = defineProps<{
    displayOwner: boolean
    displayTitle: boolean
    displayDetails: boolean
    displayIdeasBy: boolean
    idea: Idea
}>()
const { idea, displayOwner } = toRefs(props)

const store = useIdeaStore()
const { deleteIdea } = store

const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

const popup = usePopupStore()
const { askConfirmation } = popup

const toast = useToastStore()
const { showSuccess } = toast

const pageToastMessages = usePageToastMessages()
const { showDefaultError, showConnectionError } = pageToastMessages

const converter = useRatingStarConverter()
const { starColor, wholeStars, emptyStars, percentageStarFill } = converter

function splitDescription(description: string) {
    return description.split('\n')
}

function toggleMenu() {
    showMenu.value = !showMenu.value
}

async function tryDelete(id: string) {
    if (await askConfirmation('Delete Idea', 'Are you sure you want to delete this idea')) {
        deleteIdea(id).then(() => {
            showSuccess('Deleted Idea successfully')
        }).catch((err: FetchError) => {
            if ('status' in err) {
                showDefaultError()
            }
            else {
                showConnectionError()
            }
        })
    }
}
</script>