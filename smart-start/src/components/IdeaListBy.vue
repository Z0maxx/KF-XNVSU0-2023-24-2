<template>
    <div>
        <h1 v-if="user" class="flex gap-2 flex-wrap text-3xl sm:text-5xl font-medium">
            <span>Ideas By</span>
            <router-link :to="'/activities/' + user.id" class="flex flex-wrap gap-2 text-yellow-400 hover:underline">
                <div class="size-12 rounded-full overflow-hidden">
                    <img :src="'https://localhost:7256/api/GetProfilePicture/' + user.id" class="object-fit h-full">
                </div>
                <span>{{ user.userName ?? `${user.firstName} ${user.lastName}` }}</span>
            </router-link>
        </h1>
        <div v-show="isLoading">
            <h1 class="text-3xl sm:text-5xl font-medium text-transparent">_</h1>
            <div class="my-4 bg-neutral-700 border-emerald-800 border-4 rounded-lg overflow-hidden">
                <div class="p-2 bg-emerald-700 animate-pulse">
                    <h2 class="text-xl font-bold text-transparent">_</h2>
                    <div class="text-transparent">
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
                <div class="p-2 bg-emerald-600 text-transparent animate-pulse">
                    <p v-for="_ in 4" :key="_">_</p>
                </div>
                <div class="p-2 font-medium bg-emerald-500 flex flex-col sm:flex-row justify-between sm:items-center gap-2 animate-pulse">
                    <div class="text-transparent">_</div>
                    <div class="px-2 py-1 flex flex-col flex-wrap sm:flex-row gap-2 bg-teal-200 text-transparent rounded-md size-max">
                        <div class="flex gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="w-6 h-6 fill-teal-800">
                                <path d="M5.625 3.75a2.625 2.625 0 1 0 0 5.25h12.75a2.625 2.625 0 0 0 0-5.25H5.625ZM3.75 11.25a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75ZM3 15.75a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75ZM3.75 18.75a.75.75 0 0 0 0 1.5h16.5a.75.75 0 0 0 0-1.5H3.75Z" />
                            </svg>
                            <span>Details</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-for="idea in ideas" :key="idea.id">
            <IdeaComponent :idea="idea" :display-owner="false" :display-title="true" :display-details="true" :display-ideas-by="false" />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useFetchErrorHandler } from "@/composables/fetch-error-handler";
import { useIdeaStore } from "@/stores/idea";
import { useSiteUserStore } from "@/stores/site-user";
import { Idea, SiteUser } from "@/types";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { default as IdeaComponent } from "./Idea.vue";

const user = ref<SiteUser | undefined>(undefined)
const ideas = ref<Array<Idea>>([])

const store = useIdeaStore()
const { getIdeasBy } = store

const route = useRoute()
const userId = route.params.userId
if (typeof userId !== 'string') throw new Error('No User Id')

const userStore = useSiteUserStore()
const { getSiteUser } = userStore

const errorHandler = useFetchErrorHandler()
const { handleFetchError } = errorHandler

const isLoading = ref(true)

onMounted(() => {
    getSiteUser(userId).then((res) => {
        user.value = res

        getIdeasBy(userId).then((res) => {
            ideas.value = res
            isLoading.value = false
        }).catch(handleFetchError)
    }).catch(handleFetchError)
})
</script>