import { removeItem, setItem, setRef } from "@/services/ref-local-storage-service";
import { FetchError, LoginModel, RegisterModel, SiteUser, TokenModel, Validations } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

const api = 'https://localhost:7256/Auth/'
const fbResponse = 'fb-response'
const tokenModelKey = 'token-model'
const currentUserKey = 'current-user'

async function convertToJson(res: Response): Promise<object> {
    let json
    try {
        json = await res.json()
    }
    catch {
        throw res
    }
    if (!res.ok) throw json
    return json
}

function getHeadersWithBearer(token: string): HeadersInit {
    return {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
    }
}

function fetchAuth(endpoint: string, payload: unknown): Promise<Response> {
    return fetch(api + endpoint, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
}



export const useAuthStore = defineStore('Auth', () => {
    const loginValidations = ref<Validations | undefined>(undefined)
    const registerValidations = ref<Validations | undefined>(undefined)
    const tokenModel = ref<TokenModel | undefined>(undefined)
    const currentUser = ref<SiteUser | undefined>(undefined)
    setRef(tokenModelKey, tokenModel)
    setRef(currentUserKey, currentUser)

    const isLoggedIn = computed(() => {
        return tokenModel.value !== undefined
    })
    const headersWithBearer = computed(() => {
        const token = tokenModel.value?.token
        if (!token) throw new Error('No token')

        return getHeadersWithBearer(token)
    })

    async function setup(res: Response) {
        const json = await convertToJson(res) as TokenModel

        res = await fetch(api + 'GetUserInfos', {
            headers: getHeadersWithBearer(json.token)
        })

        setItem(tokenModelKey, json, tokenModel)
        setItem(currentUserKey, await convertToJson(res), currentUser)
    }

    async function login(loginModel: LoginModel): Promise<void> {
        const res = await fetchAuth('Login', loginModel)
        await setup(res)
    }

    async function loginFacebook(fbToken: TokenModel) {
        const res = await fetchAuth('Facebook', fbToken)
        await setup(res)
    }

    function logout() {
        removeItem(tokenModelKey, tokenModel)
        removeItem(currentUserKey, currentUser)
        if (localStorage.getItem(fbResponse)) {
            localStorage.removeItem(fbResponse)
            window.dispatchEvent(new Event('fb-logout'))
        }
    }

    async function register(registerModel: RegisterModel): Promise<void> {
        const res = await fetchAuth('Register', registerModel)
        await setup(res)
    }

    async function setLoginValidations(): Promise<void> {
        if (loginValidations.value !== undefined) return

        await login({ email: '', password: '' }).catch((err: FetchError) => {
            if ('errors' in err && err.status === 400) {
                loginValidations.value = err.errors
            }
            else {
                throw err
            }
        })
    }

    async function setRegisterValidations(): Promise<void> {
        if (registerValidations.value !== undefined) return

        await register({
            email: '',
            password: '',
            userName: '',
            firstName: '',
            lastName: ''
        }).catch((err: FetchError) => {
            if ('errors' in err && err.status === 400) {
                registerValidations.value = err.errors
            }
            else {
                throw err
            }
        })
    }

    return {
        isLoggedIn,
        tokenModel,
        currentUser,
        loginValidations,
        registerValidations,
        headersWithBearer,
        login,
        loginFacebook,
        logout,
        register,
        setLoginValidations,
        setRegisterValidations
    }
})