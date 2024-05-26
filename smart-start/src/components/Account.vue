<template>
    <div>
        <h1 class="text-3xl sm:text-5xl font-medium">Account</h1>
        <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4 max-w-xl">
            <div>
                <div>Current Profile Picture</div>
                <div class="flex gap-2 items-end">
                    <div class="size-12 rounded-full overflow-hidden">
                        <img :src="'https://localhost:7256/api/GetProfilePicture/' + currentUser?.id" class="object-cover h-full">
                    </div>
                    <div class="size-8 rounded-full overflow-hidden">
                        <img :src="'https://localhost:7256/api/GetProfilePicture/' + currentUser?.id" class="object-cover h-full">
                    </div>
                    <div class="size-6 rounded-full overflow-hidden">
                        <img :src="'https://localhost:7256/api/GetProfilePicture/' + currentUser?.id" class="object-cover h-full">
                    </div>
                </div>
                <div class="relative">
                    <label for="profile-picture" class="flex gap-2">
                        <span>New Profile Picture</span>
                        <div class="size-6 rounded-full overflow-hidden">
                            <img ref="preview" class="object-cover h-full">
                        </div>
                    </label>
                    <input v-on:change="handleProfilePictureChange" id="profile-picture" type="file" accept="image/jpeg,image/gif,image/png" class="file:bg-lime-600 file:border-solid file:text-white file:rounded file:border-lime-800 file:cursor-pointer cursor-pointer relative w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                    <div v-if="profilePictureRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                </div>
            </div>
            <div class="mt-4 relative">
                <label for="first-name" class="block">First Name</label>
                <input v-model="firstName" id="first-name" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                <div v-if="firstNameRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                <div v-for="error in firstNameErrors" :key="error">
                    <p class="text-cyan-400">{{ error }}</p>
                </div>
            </div>
            <div class="mt-4 relative">
                <label for="last-name" class="block">Last Name</label>
                <input v-model="lastName" id="last-name" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                <div v-if="lastNameRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                <div v-for="error in lastNameErrors" :key="error">
                    <p class="text-cyan-400">{{ error }}</p>
                </div>
            </div>
            <div class="mt-4 relative">
                <label for="user-name" class="block">Username <span class="text-sm">(will be displayed instead of Name if different than Email)</span></label>
                <input v-model="userName" id="user-name" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                <div v-if="userNameRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                <div v-for="error in userNameErrors" :key="error">
                    <p class="text-cyan-400">{{ error }}</p>
                </div>
            </div>
            <div class="mt-4">
                <label for="email" class="block">Email</label>
                <input disabled id="email" class="w-full p-1 bg-emerald-700 border-emerald-800 border-2 rounded text-cyan-400" :value="currentUser?.email">
            </div>
            <button @click="tryUpdateProfile" class="p-2 mt-6 w-full flex justify-center bg-lime-600 hover:bg-lime-700 border-2 border-lime-800 font-medium rounded">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                    <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
                </svg>
                <span class="ml-1">Update Profile</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useFetchErrorHandler } from '@/composables/fetch-error-handler';
import { useValidation } from '@/composables/validation';
import { useAuthStore } from '@/stores/auth';
import { useToastStore } from '@/stores/toast';
import { Errors, FetchError, Requireds, UpdateProfileModel } from '@/types';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

const firstName = ref('')
const lastName = ref('')
const userName = ref('')
const profilePicture = ref<FileList | null>(null)

const firstNameErrors = ref<Array<string>>([])
const lastNameErrors = ref<Array<string>>([])
const userNameErrors = ref<Array<string>>([])

const errors: Errors = {
    FirstName: firstNameErrors,
    LastName: lastNameErrors,
    UserName: userNameErrors
}

const firstNameRequired = ref(false)
const lastNameRequired = ref(false)
const userNameRequired = ref(false)
const profilePictureRequired = ref(false)
const requireds: Requireds = {
    FirstName: firstNameRequired,
    LastName: lastNameRequired,
    UserName: userNameRequired,
    ProfilePictureContentType: profilePictureRequired
}

const preview = ref<HTMLImageElement>(document.createElement('img'))

const validation = useValidation()
const { setRequiredFields } = validation

const store = useAuthStore()

const { updateProfile, setUpdateProfileValidations } = store
const { updateProfileValidations } = storeToRefs(store)

const toast = useToastStore()
const { showSuccess } = toast

const errorHandler = useFetchErrorHandler()
const { handleFetchError, handleFormFetchError } = errorHandler

const auth = useAuthStore()
const { currentUser } = storeToRefs(auth)

function setDefaultValues() {
    const user = currentUser.value
    if (!user || !user.firstName || !user.lastName || !user.userName) return

    userName.value = user.userName
    firstName.value = user.firstName
    lastName.value = user.lastName
}

onMounted(() => {
    setUpdateProfileValidations().then(() => {
        setRequiredFields(requireds, updateProfileValidations.value)
    }).catch(handleFetchError)

    setDefaultValues()
})

function handleProfilePictureChange(e: Event) {
    const target = e.target as HTMLInputElement
    profilePicture.value = target.files
    if (!profilePicture.value || !profilePicture.value[0]) return

    const reader = new FileReader()
    const picture = profilePicture.value[0]
    reader.readAsDataURL(picture)
    reader.addEventListener('load', () => {
        preview.value.src = reader.result as string
    })
}

async function tryUpdateProfile() {
    const model: UpdateProfileModel = {
        userName: userName.value,
        firstName: firstName.value,
        lastName: lastName.value,
    }

    if (profilePicture.value && profilePicture.value[0]) {
        const picture = profilePicture.value[0]
        const image = preview.value
        const split = image.src.split(',')

        model.profilePictureContentType = picture.type
        model.profilePictureData = split[1]
    }

    updateProfile(model).then(() => {
        showSuccess('Updated Profile was successfully')
    }).catch((err: FetchError) => {
        handleFormFetchError(err, errors)
    })
}
</script>