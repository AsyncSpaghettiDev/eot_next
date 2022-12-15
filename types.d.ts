import { FunctionComponent, ReactElement } from "react"

interface AuthenticateContext {
    user: User
    authenticated: boolean
    login: (username: string, password: string) => Promise<void>
    logout: () => Promise<void>
}

interface SettingsContext {
    isLoading: boolean
    readScreen: boolean
    updateReadScreen: (value: boolean) => void
    updateIsLoading: (value: boolean) => void
}

type Token = {
    authenticated: boolean
    name: string
    isStaff: boolean
    tableId: number | null
    expires: string
    expired: boolean
}

type OnChangeFormEvent =
    ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>

interface User {
    id?: number
    username: string
    role: Role
}

interface Role {
    id?: number
    sortId: number
    name: string
    description: string
    isStaff: boolean
}

interface Plate {
    id: number
    name: string
    price: number
    description: string
    image: string
    quantity: number
    categoryId: number
    isVeg: boolean
    category: Category
}

interface Category {
    id?: number
    name: string
    description: string
    sortId?: number
}