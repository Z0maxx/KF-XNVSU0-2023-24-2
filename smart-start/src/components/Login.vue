<template>
    <div class="size-max">
        <h1 class="text-3xl sm:text-5xl font-medium">Login</h1>
        <div class="mt-4 p-2 flex flex-col sm:flex-row flex-gap gap-2 bg-green-200 rounded">
            <form class="w-96">
                <h2 class="text-2xl sm:text-3xl text-green-800 font-medium">Use a local account</h2>
                <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4">
                    <div class="relative">
                        <label for="email" class="block">Email</label>
                        <input type="email" v-model="email" autocomplete="username" id="email" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded invalid:border-orange-500 invalid:outline-orange-500 valid:focus:outline-blue-500">
                        <div v-if="emailRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                        <div v-for="error in emailErrors" :key="error">
                            <p class="text-cyan-400">{{ error }}</p>
                        </div>
                    </div>
                    <div class="mt-4 relative">
                        <label for="password" class="block">Password</label>
                        <input required type="password" v-model="password" autocomplete="current-password" id="password" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
                        <div v-if="passwordRequired" class="text-cyan-400 text-xl absolute right-2 top-6">*</div>
                        <div v-for="error in passwordErrors" :key="error">
                            <p class="text-cyan-400">{{ error }}</p>
                        </div>
                    </div>
                    <button type="button" @click="tryLogin" class="p-2 mt-6 w-full flex justify-center bg-lime-600 hover:bg-lime-700 border-2 border-lime-800 font-medium rounded">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                            <path fill-rule="evenodd" d="M7.5 3.75A1.5 1.5 0 0 0 6 5.25v13.5a1.5 1.5 0 0 0 1.5 1.5h6a1.5 1.5 0 0 0 1.5-1.5V15a.75.75 0 0 1 1.5 0v3.75a3 3 0 0 1-3 3h-6a3 3 0 0 1-3-3V5.25a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3V9A.75.75 0 0 1 15 9V5.25a1.5 1.5 0 0 0-1.5-1.5h-6Zm5.03 4.72a.75.75 0 0 1 0 1.06l-1.72 1.72h10.94a.75.75 0 0 1 0 1.5H10.81l1.72 1.72a.75.75 0 1 1-1.06 1.06l-3-3a.75.75 0 0 1 0-1.06l3-3a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
                        </svg>
                        <span class="ml-1">Login</span>
                    </button>
                    <div class="text-cyan-400" v-if="incorrect">Incorrect Username or Password</div>
                </div>
            </form>
            <div class="w-80 flex flex-col">
                <h2 class="text-2xl sm:text-3xl text-green-800 font-medium">Sign in with a service</h2>
                <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4 flex-1">
                    <div class="fb-login-button" data-width="100" data-size="large" data-button-type="" data-layout="" data-auto-logout-link="false" data-use-continue-as="false" onlogin="checkLoginState();"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { useAuthStore } from '@/stores/auth';
import { FbTokenModel, LoginModel, NetworkError } from '@/types';
import { Ref, onMounted, ref } from 'vue';
import { resetErrors, setErrors, setRequiredFields } from '@/services/validation-helper';
import { storeToRefs } from 'pinia';
import router from '@/router';

const email = ref('')
const password = ref('')

const emailErrors = ref<Array<string>>([])
const passwordErrors = ref<Array<string>>([])

const errors: Record<string, Ref<Array<string>>> = {
    Email: emailErrors,
    Password: passwordErrors
}

const emailRequired = ref(false)
const passwordRequired = ref(false)
const requireds: Record<string, Ref<boolean>> = {
    Email: emailRequired,
    Password: passwordRequired
}

const incorrect = ref(false)
const store = useAuthStore()

const { login, loginFacebook, setLoginValidations } = store
const { loginValidations } = storeToRefs(store)

onMounted(() => {
    setLoginValidations().then(() => {
        setRequiredFields(requireds, loginValidations.value)
    }).catch(() => {
        alert('Something went wrong')
    })
    window.dispatchEvent(new Event('fb-reload'))
})

async function tryLogin() {
    const loginModel: LoginModel = { email: email.value, password: password.value }
    login(loginModel).then(() => {
        router.push({ path: 'ideas' })
    }).catch((err: NetworkError) => {
        if (err.status === 400 && 'errors' in err) {
            setErrors(errors, err.errors)
            incorrect.value = false
        }
        else if (err.status === 401) {
            incorrect.value = true
            resetErrors(errors)
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