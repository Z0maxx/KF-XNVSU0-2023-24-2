<template>
    <div v-show="displayed" class="fixed inset-0 z-50 h-svh w-screen flex items-center justify-center before:absolute before:w-full backdrop-blur-sm">
        <div class="relative p-4 w-full max-w-lg">
            <div class="relative shadow">
                <div class="bg-cyan-600 p-4 border-x-2 border-top-2 border-cyan-800 rounded-t-lg">
                    <h3 class="mb-3 text-2xl font-medium">{{ title }}</h3>
                    <p>{{ description }}</p>
                </div>
                <div class="flex justify-end flex-wrap gap-4 text-center bg-cyan-200 border-x-2 border-b-2 border-cyan-800 rounded-b-lg p-4">
                    <button @click="cancel" class="py-2 px-4 w-full text-sm font-medium rounded-lg sm:w-auto border-2 border-indigo-800 bg-indigo-600 hover:bg-indigo-700">Cancel</button>
                    <button @click="confirm" class="py-2 px-4 w-full text-sm font-medium rounded-lg sm:w-auto border-2 border-green-800 bg-green-600 hover:bg-green-700">Confirm</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { usePopupStore } from '@/stores/popup';
import { storeToRefs } from 'pinia';

const store = usePopupStore()
const { displayed, title, description } = storeToRefs(store)
const { cancel, confirm } = store
</script>