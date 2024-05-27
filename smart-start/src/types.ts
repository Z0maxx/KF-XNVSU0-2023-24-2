import { Ref } from "vue"

export type LoginModel = {
    email: string
    password: string
}

export type UpdateProfileModel = {
    userName: string,
    firstName: string,
    lastName: string,
    profilePictureContentType?: string,
    profilePictureData?: string
}

export type RegisterModel = LoginModel & UpdateProfileModel

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
    userName?: string
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

export type ValidationErrors = { status: 400, errors: Validations }

export type NetworkError = ValidationErrors | { status: number }

export type MessageError = { message: string }

export type FetchError = NetworkError | MessageError | object

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
    priceUnit: string
    ideaRating: number
    priceRating: number
    ratingCount: number
    commentCount: number
}

export type IdeaLLP = Idea & {
    owner: SiteUser
    comments: Array<CommentLLP>
    ratings: Array<RatingLLP>
}

export type FormIdea = TableModel & {
    title: string
    description: string
    price: number | undefined
    priceUnit: string
}

export type Comment = TableModel & {
    ownerId: string
    ideaId: string
    message: string
    ideaTitle?: string
}

export type CommentLLP = Comment & {
    owner: SiteUser
}

export type Rating = TableModel & {
    ideaId: string
    ownerId: string
    priceRating: number
    ideaRating: number
    ideaTitle?: string
}

export type RatingLLP = Rating & {
    owner: SiteUser
}

export type ChartData = {
    name: string | number
    value: string | number
}

export type StatusMessage = {
    status: number
    message: string
}

export type FetchErrorHandlerOptions = {
    errors?: Errors
    statusMessages?: Array<StatusMessage>
}

export type SignalRModel = 'Idea' | 'Rating' | 'Comment' | 'SiteUser'

export type SignalRType = 'Created' | 'Changed' | 'Updated' | 'Deleted'