import { Ref } from "vue"

export type LoginModel = {
    email: string
    password: string
}

export type RegisterModel = LoginModel & {
    userName: string,
    firstName: string,
    lastName: string,
    profilePictureContentType?: string,
    profilePictureData?: string
}

export type TokenModel = {
    token: string
    expiration: string
}

export type FbTokenModel = {
    authResponse: {
        userID: string,
        expiresIn: number,
        accessToken: string,
        signedRequest: string,
        graphDomain: string,
        data_access_expiration_time: number
    },
    status: string
}

export type TableModel = {
    id: string
}

export type SiteUser = TableModel & {
    email: string
    firstName?: string
    lastName?: string
    username?: string
    roles?: Array<string>
}

export type Validations = Record<string, Array<string>>

export type Errors = Record<string, Ref<Array<string>>>

export type Requireds = Record<string, Ref<boolean>>

export type BadRequest = { status: 400, errors: Validations }

export type NetworkError = BadRequest | { status: number }

export type ToastType = 'success' | 'alert' | 'danger'

export type ToastTheme = {
    background: string
    text: string
    highlight: string
}

export type ToastThemes = Record<ToastType, ToastTheme>