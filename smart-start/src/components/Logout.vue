<template>
    Logout
</template>

<script lang="ts" setup>
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { onMounted } from 'vue';

const store = useAuthStore()
const { logout } = store

onMounted(() => {
    logout()
    router.push({ path: '/' })
})
</script>