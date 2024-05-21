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
        data_access_expiration_time: 1724065133
    },
    status: string
}

export type TableModel = {
    id: string
}

export type SiteUser = TableModel & LoginModel & {
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