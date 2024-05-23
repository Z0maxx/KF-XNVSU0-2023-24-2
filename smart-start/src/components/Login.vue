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
                        <input type="password" v-model="password" autocomplete="current-password" id="password" class="w-full p-1 bg-emerald-600 border-emerald-800 border-2 rounded focus:outline-blue-500">
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
                </div>
            </form>
            <div class="w-full sm:w-80 flex flex-col">
                <h2 class="text-2xl sm:text-3xl text-green-800 font-medium">Sign in with a service</h2>
                <div class="p-2 bg-green-700 border-green-800 border-2 rounded mt-4 flex-1">
                    <div id="fb-spinner">
                        <svg aria-hidden="true" class="size-10 animate-spin text-blue-700" style="fill: #1877f2;" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                        </svg>
                        <span class="sr-only">Loading...</span>
                    </div>
                    <div class="fb-login-button w-full" data-width="100%" data-size="large" data-use-continue-as="true" onlogin="checkLoginState();"></div>
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
import { useToastStore } from '@/stores/toast';

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

const store = useAuthStore()

const { login, loginFacebook, setLoginValidations } = store
const { loginValidations } = storeToRefs(store)

const toast = useToastStore()
const { showAlert, showDanger } = toast
const defaultError = 'Something went wrong'

onMounted(() => {
    setLoginValidations().then(() => {
        setRequiredFields(requireds, loginValidations.value)
    }).catch(() => {
        showAlert(defaultError)
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
        }
        else if (err.status === 401) {
            resetErrors(errors)
            showDanger('Incorrect Email or Password')
        }
        else {
            showAlert(defaultError)
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
        }).catch(() => {
            showAlert(defaultError)
        })
    }
})
</script>