<template>
    <div>
        <h1 class="text-3xl sm:text-5xl font-medium">Ideas</h1>
        <div v-show="isLoading" class="my-4 bg-neutral-700 border-emerald-800 border-4 rounded-lg overflow-hidden">
            <div class="p-2 bg-emerald-700 animate-pulse">
                <div class="size-6 rounded-full bg-emerald-400"></div>
                <h2 class="text-xl font-bold text-emerald-700">_</h2>
                <div class="text-emerald-700">
                    <div>_</div>
                    <div class="flex">
                        <svg v-for="_ in 5" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                    <div>_</div>
                    <div class="flex">
                        <svg v-for="_ in 5" :key="_" xmlns="http://www.w3.org/2000/svg" stroke="black" fill="gray" viewBox="0 0 24 24" stroke-width="1" class="size-8">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="p-2 bg-emerald-600 text-emerald-600 animate-pulse">
                <p v-for="_ in 4" :key="_">_</p>
            </div>
            <div class="p-2 font-medium bg-emerald-500 flex flex-col sm:flex-row justify-between sm:items-center gap-2 animate-pulse">
                <div class="text-emerald-500">_</div>
                <div class="px-2 py-1 flex flex-col flex-wrap sm:flex-row gap-2 bg-teal-200 text-teal-200 rounded-md size-max">
                    <div class="flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-teal-800">
                            <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                        </svg>
                        <span>Details</span>
                    </div>
                    <div class="flex gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-teal-800">
                            <path d="M12 .75a8.25 8.25 0 0 0-4.135 15.39c.686.398 1.115 1.008 1.134 1.623a.75.75 0 0 0 .577.706c.352.083.71.148 1.074.195.323.041.6-.218.6-.544v-4.661a6.714 6.714 0 0 1-.937-.171.75.75 0 1 1 .374-1.453 5.261 5.261 0 0 0 2.626 0 .75.75 0 1 1 .374 1.452 6.712 6.712 0 0 1-.937.172v4.66c0 .327.277.586.6.545.364-.047.722-.112 1.074-.195a.75.75 0 0 0 .577-.706c.02-.615.448-1.225 1.134-1.623A8.25 8.25 0 0 0 12 .75Z" />
                            <path fill-rule="evenodd" d="M9.013 19.9a.75.75 0 0 1 .877-.597 11.319 11.319 0 0 0 4.22 0 .75.75 0 1 1 .28 1.473 12.819 12.819 0 0 1-4.78 0 .75.75 0 0 1-.597-.876ZM9.754 22.344a.75.75 0 0 1 .824-.668 13.682 13.682 0 0 0 2.844 0 .75.75 0 1 1 .156 1.492 15.156 15.156 0 0 1-3.156 0 .75.75 0 0 1-.668-.824Z" clip-rule="evenodd" />
                        </svg>
                        <span>_________________</span>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="idea in ideas" :key="idea.id">
            <Idea :idea="idea" :display-owner="true" :display-title="true" :display-details="true" :display-ideas-by="true"/>
        </div>
    </div>
</template>
<script lang="ts" setup>
import Idea from "./Idea.vue";
import { usePageToastMessages } from "@/composables/page-toast-messages";
import { useIdeaStore } from "@/stores/idea";
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";

const store = useIdeaStore()
const { getIdeas } = store
const { ideas } = storeToRefs(store)

const pageToastMessages = usePageToastMessages()
const { showConnectionError } = pageToastMessages

const isLoading = ref(true)

onMounted(() => {
    getIdeas()
        .then(() => isLoading.value = false)
        .catch(() => {
            showConnectionError()
        })
})
</script>