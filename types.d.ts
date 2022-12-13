interface AuthenticateContext {
    user: User
    authenticated: boolean
    login: (username: string, password: string) => void
    logout: () => void
}

interface SettingsContext {
    isLoading: boolean
    readScreen: boolean
    updateReadScreen: (value: boolean) => void
    updateIsLoading: (value: boolean) => void
}

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
    category: Category
}