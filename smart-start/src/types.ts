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

export type SiteUserLLP = SiteUser & {
    ideas: Array<Idea>
    ratings: Array<Rating>
    comments: Array<Comment>
}

export type Validations = Record<string, Array<string>>

export type Errors = Record<string, Ref<Array<string>>>

export type Requireds = Record<string, Ref<boolean>>

export type BadRequest = { status: 400, errors: Validations }

export type NetworkError = BadRequest | { status: number }

export type FetchError = NetworkError | object

export type ToastType = 'success' | 'alert' | 'danger'

export type ToastTheme = {
    background: string
    text: string
    highlight: string
}

export type ToastThemes = Record<ToastType, ToastTheme>

export type Idea = {
    id: string
    ownerId: string
    title: string
    description: string
    price: number
    priceUnit: string,
    ideaRating: number,
    priceRating: number
    owner: SiteUser
}

export type IdeaLLP = Idea & {
    comments: Array<CommentLLP>
    ratings: Array<RatingLLP>
}

export type Comment = {
    id: string
    ownerId: string
    ideaId: string
    message: string
}

export type CommentLLP = Comment & {
    owner: SiteUser
}

export type Rating = {
    id: string,
    ideaId: string
    ownerId: string
    priceRating: number
    ideaRating: number
}

export type RatingLLP = Rating & {
    owner: SiteUser
}

export type ChartData = {
    name: string | number
    value: string | number
}