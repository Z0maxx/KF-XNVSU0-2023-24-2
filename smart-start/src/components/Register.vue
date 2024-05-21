<template>
    <div class="size-max">
        <h1 class="text-3xl sm:text-5xl font-medium">Register</h1>
        <div class="mt-4 p-2 flex flex-col sm:flex-row flex-gap gap-2 bg-green-200 rounded">
            <form class="w-96">
                <h2 class="text-2xl sm:text-3xl text-green-800 font-medium">Create an account</h2>
                <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4">
                    <div class="relative">
                        <label for="profile-picture" class="flex gap-2">
                            <span>Profile Picture</span>
                            <div class="size-6 rounded-full overflow-hidden">
                                <img ref="preview" class="object-cover h-full">
                            </div>
                        </label>
                        <input v-on:change="handleProfilePictureChange" id="profile-picture" type="file" class="file:bg-lime-600 file:border-solid file:text-white file:rounded file:border-lime-800 file:cursor-pointer cursor-pointer relative w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                        <div v-if="profilePictureRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
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
                        <label for="email" class="block">Email</label>
                        <input type="email" v-model="email" autocomplete="username" id="email" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded invalid:border-orange-500 invalid:outline-orange-500 valid:focus:outline-blue-500">
                        <div v-if="emailRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                        <div v-for="error in emailErrors" :key="error">
                            <p class="text-cyan-400">{{ error }}</p>
                        </div>
                    </div>
                    <div class="mt-4 relative">
                        <label for="password" class="block">Password</label>
                        <input type="password" v-model="password" autocomplete="new-password" id="password" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                        <div v-if="passwordRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                        <div v-for="error in passwordErrors" :key="error">
                            <p class="text-cyan-400">{{ error }}</p>
                        </div>
                    </div>
                    <div class="mt-4 relative">
                        <label for="confirm-password" class="block">Confirm Password</label>
                        <input type="password" v-model="confirmPassword" autocomplete="new-password" id="confirm-password" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                        <div v-if="passwordRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                        <div v-for="error in confirmPasswordErrors" :key="error">
                            <p class="text-cyan-400">{{ error }}</p>
                        </div>
                    </div>
                    <button type="button" @click="tryRegister" class="p-2 mt-6 w-full flex justify-center bg-lime-600 hover:bg-lime-700 border-2 border-lime-800 font-medium rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path d="M5.25 6.375a4.125 4.125 0 1 1 8.25 0 4.125 4.125 0 0 1-8.25 0ZM2.25 19.125a7.125 7.125 0 0 1 14.25 0v.003l-.001.119a.75.75 0 0 1-.363.63 13.067 13.067 0 0 1-6.761 1.873c-2.472 0-4.786-.684-6.76-1.873a.75.75 0 0 1-.364-.63l-.001-.122ZM18.75 7.5a.75.75 0 0 0-1.5 0v2.25H15a.75.75 0 0 0 0 1.5h2.25v2.25a.75.75 0 0 0 1.5 0v-2.25H21a.75.75 0 0 0 0-1.5h-2.25V7.5Z" />
                        </svg>
                        <span class="ml-1">Register</span>
                    </button>
                </div>
            </form>
            <div class="w-80 flex flex-col">
                <h2 class="text-2xl sm:text-3xl text-green-800 font-medium">Sign up with a service</h2>
                <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4 flex-1">
                    <div class="fb-login-button" data-width="100" data-size="large" data-button-type="continue_with" data-layout="" data-auto-logout-link="false" data-use-continue-as="false" onlogin="checkLoginState();"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router';
import { setErrors, setRequiredFields } from '@/services/validation-helper';
import { useAuthStore } from '@/stores/auth';
import { FbTokenModel, NetworkError, RegisterModel } from '@/types';
import { storeToRefs } from 'pinia';
import { Ref, onMounted, ref } from 'vue';

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const firstName = ref('')
const lastName = ref('')
const profilePicture = ref<FileList | null>(null)

const emailErrors = ref<Array<string>>([])
const passwordErrors = ref<Array<string>>([])
const confirmPasswordErrors = ref<Array<string>>([])
const firstNameErrors = ref<Array<string>>([])
const lastNameErrors = ref<Array<string>>([])

const errors: Record<string, Ref<Array<string>>> = {
    Email: emailErrors,
    Password: passwordErrors,
    FirstName: firstNameErrors,
    LastName: lastNameErrors
}

const emailRequired = ref(false)
const passwordRequired = ref(false)
const firstNameRequired = ref(false)
const lastNameRequired = ref(false)
const profilePictureRequired = ref(false)
const requireds: Record<string, Ref<boolean>> = {
    Email: emailRequired,
    Password: passwordRequired,
    FirstName: firstNameRequired,
    LastName: lastNameRequired,
    ProfilePictureContentType: profilePictureRequired
}

const preview = ref<HTMLImageElement>(document.createElement('img'))

const store = useAuthStore()

const { register, loginFacebook, setRegisterValidations } = store
const { registerValidations } = storeToRefs(store)

onMounted(() => {
    setRegisterValidations().then(() => {
        setRequiredFields(requireds, registerValidations.value)
    }).catch(() => {
        alert('Something went wrong')
    })
    window.dispatchEvent(new Event('fb-reload'))
})

function handleProfilePictureChange(e: Event) {
    const target = e.target as HTMLInputElement
    profilePicture.value = target.files
    if (!profilePicture.value || !profilePicture.value[0]) return

    const image = preview.value
    const reader = new FileReader()
    const picture = profilePicture.value[0]
    console.log(picture)
    reader.readAsDataURL(picture)
    reader.addEventListener('load', () => {
        image.src = reader.result as string
    })
}

async function tryRegister() {
    if (password.value != confirmPassword.value) {
        confirmPasswordErrors.value.push('Field must match with Password')
        return
    }
    else {
        confirmPasswordErrors.value.pop()
    }

    const registerModel: RegisterModel = {
        email: email.value,
        userName: email.value,
        password: password.value,
        firstName: firstName.value,
        lastName: lastName.value,
    }

    if (profilePicture.value && profilePicture.value[0]) {
        const picture = profilePicture.value[0]
        const image = preview.value
        const split = image.src.split(',')

        registerModel.profilePictureContentType = picture.type
        registerModel.profilePictureData = split[1]
    }

    register(registerModel).then(() => {
        router.push({ path: 'ideas' })
    }).catch((err: NetworkError) => {
        if (err.status === 400 && 'errors' in err) {
            setErrors(errors, err.errors)
        }
        else {
            alert('Something went wrong')
        }
    })
}

window.addEventListener('fb-response', () => {
    const res = JSON.parse(localStorage.getItem('fb-response') ?? '{}') as FbTokenModel
    if (res.status === 'connected') {
        const expiration = new Date()
        expiration.setSeconds(expiration.getSeconds() + res.authResponse.expiresIn)
        loginFacebook({ token: res.authResponse.accessToken, expiration: expiration.toISOString() }).then(() => {
            router.push({ path: 'ideas' })
        }).catch((err: NetworkError) => {
            if (err.status === 400 && 'errors' in err) {
                setErrors(errors, err.errors)
            }
            else {
                alert('Something went wrong')
            }
        })
    }
})
</script>
