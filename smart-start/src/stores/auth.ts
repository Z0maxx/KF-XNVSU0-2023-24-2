import { LoginModel, NetworkError, RegisterModel, SiteUser, TokenModel, Validations } from "@/types";
import { defineStore } from "pinia";

const api = 'https://localhost:7256/Auth/'
const tokenName = 'smart-start-token'
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

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => ({
        currentUser: undefined as SiteUser | undefined,
        loginValidations: undefined as Validations | undefined,
        registerValidations: undefined as Validations | undefined,
    }),

    getters: {
        tokenModel(): TokenModel | undefined {
            const token = localStorage.getItem(tokenName)
            return token ? JSON.parse(token) as TokenModel : undefined
        },

        isLoggedIn(): boolean {
            return this.tokenModel !== undefined
        },

        headersWithBearer(): HeadersInit {
            const token = this.tokenModel?.token
            if (!token) throw new Error('No token')

            return getHeadersWithBearer(token)
        }
    },

    actions: {
        async login(loginModel: LoginModel): Promise<void> {
            const res = await fetchAuth('Login', loginModel)
            await setup(this, res)
        },

        async loginFacebook(fbToken: TokenModel) {
            const res = await fetchAuth('Facebook', fbToken)
            await setup(this, res)
        },

        logout() {
            localStorage.removeItem(tokenName)
            localStorage.removeItem('fb-response')
            window.dispatchEvent(new Event('fb-logout'))
        },

        async register(registerModel: RegisterModel): Promise<void> {
            const res = await fetchAuth('Register', registerModel)
            await setup(this, res)
        },

        async setLoginValidations(): Promise<void> {
            await this.login({ email: '', password: '' }).catch((err: NetworkError) => {
                if (err.status === 400 && 'errors' in err) {
                    this.loginValidations = err.errors as Validations
                }
                else {
                    throw err
                }
            })
        },

        async setRegisterValidations(): Promise<void> {
            await this.register({
                email: '',
                password: '',
                userName: '',
                firstName: '',
                lastName: ''
            }).catch((err: NetworkError) => {
                if (err.status === 400 && 'errors' in err) {
                    this.registerValidations = err.errors as Validations
                }
                else {
                    throw err
                }
            })
        },
    }
})

async function setup(store: { tokenModel: TokenModel | undefined, currentUser: SiteUser | undefined }, res: Response) {
    let json: TokenModel | SiteUser = await convertToJson(res) as TokenModel
    const token = json.token
    res = await fetch(api + 'GetUserInfos', {
        headers: getHeadersWithBearer(token)
    })

    try {
        json = await convertToJson(res) as SiteUser
    }
    catch (err) {
        localStorage.removeItem(tokenName)
        throw err
    }

    localStorage.setItem(tokenName, JSON.stringify(token))
    store.currentUser = json
}
