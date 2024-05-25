<template>
    <div v-show="displayed" class="inset-x-0 mx-auto fixed top-4 flex justify-center text-sm pointer-events-none">
        <div class="flex items-center w-full max-w-md p-2 rounded-lg shadow mx-2 pointer-events-auto" :class="[background, text]">
            <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg" :class="[highlight]">
                <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path v-if="type === 'success'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                    <path v-if="type === 'alert'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                    <path v-if="type === 'danger'" d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
                </svg>
            </div>
            <div class="ms-3 font-semibold">{{ message }}</div>
            <button @click="close" class="ms-auto bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useToastStore } from '@/stores/toast';
import { ToastThemes } from '@/types';
import { storeToRefs } from 'pinia';
import { ref, watchEffect } from 'vue';

const store = useToastStore()
const { close } = store
const { message, type, displayed } = storeToRefs(store)
const background = ref('')
const text = ref('')
const highlight = ref('')

const themes: ToastThemes = {
    success: {
        background: 'bg-green-100',
        text: 'text-green-600',
        highlight: 'bg-green-200'
    },
    alert: {
        background: 'bg-amber-100',
        text: 'text-amber-600',
        highlight: 'bg-amber-200'
    },
    danger: {
        background: 'bg-red-100',
        text: 'text-red-600',
        highlight: 'bg-red-200'
    }
}

watchEffect(() => {
    const selected = themes[type.value]
    background.value = selected.background
    highlight.value = selected.highlight
    text.value = selected.text
})
</script>