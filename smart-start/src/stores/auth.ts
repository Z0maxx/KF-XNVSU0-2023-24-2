import router from "@/router";
import { removeItem, setItem, setRef } from "@/services/ref-local-storage-service";
import { FetchError, LoginModel, RegisterModel, SiteUser, TokenModel, UpdateProfileModel, Validations } from "@/types";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

let tokenExpiration: number

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
    const updateProfileValidations = ref<Validations | undefined>(undefined)
    const tokenModel = ref<TokenModel | undefined>(undefined)
    const currentUser = ref<SiteUser | undefined>(undefined)
    setRef(tokenModelKey, tokenModel)
    setRef(currentUserKey, currentUser)

    const isLoggedIn = computed(() => {
        return tokenModel.value !== undefined
    })

    const isModerator = computed(() => {
        return currentUser.value?.roles?.includes('Moderator')
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

        const now = new Date().getTime()
        setItem(tokenModelKey, json)
        setItem(currentUserKey, await convertToJson(res))
        const expiration = tokenModel.value?.expiration
        if (!expiration) throw new Error('No Expiration')
        
        tokenExpiration = setTimeout(() => {
            logout()
            router.push({ path: '/login' })
        }, new Date(expiration).getTime() - now)
    }

    async function login(model: LoginModel): Promise<void> {
        const res = await fetchAuth('Login', model)
        await setup(res)
    }

    async function loginFacebook(fbToken: TokenModel) {
        const res = await fetchAuth('Facebook', fbToken)
        await setup(res)
    }

    function logout() {
        clearTimeout(tokenExpiration)
        removeItem(tokenModelKey)
        removeItem(currentUserKey)
        if (localStorage.getItem(fbResponse)) {
            localStorage.removeItem(fbResponse)
            window.dispatchEvent(new Event('fb-logout'))
        }
    }

    async function register(model: RegisterModel): Promise<void> {
        const res = await fetchAuth('Register', model)
        await setup(res)
    }

    async function updateProfile(model: UpdateProfileModel): Promise<void> {
        let res = await fetch(api + 'UpdateProfile', {
            method: 'put',
            headers: headersWithBearer.value,
            body: JSON.stringify(model)
        })

        if (!res.ok) await convertToJson(res)

        res = await fetch(api + 'GetUserInfos', {
            headers: headersWithBearer.value
        })
        setItem(currentUserKey, await convertToJson(res))
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

    async function setUpdateProfileValidations(): Promise<void> {
        if (updateProfileValidations.value !== undefined) return

        await updateProfile({
            userName: '',
            firstName: '',
            lastName: ''
        }).catch((err: FetchError) => {
            if ('errors' in err && err.status === 400) {
                updateProfileValidations.value = err.errors
            }
            else {
                throw err
            }
        })
    }

    async function deleteAccount(): Promise<void> {
        const res = await fetch(api + 'DeleteMyself', {
            method: 'delete',
            headers: headersWithBearer.value
        })

        if (!res.ok) {
            let json
            try {
                json = await res.json()
            }
            catch {
                throw res
            }
            throw json
        }
    }

    return {
        isLoggedIn,
        currentUser,
        isModerator,
        loginValidations,
        registerValidations,
        updateProfileValidations,
        headersWithBearer,
        login,
        loginFacebook,
        logout,
        register,
        updateProfile,
        deleteAccount,
        setLoginValidations,
        setRegisterValidations,
        setUpdateProfileValidations
    }
})