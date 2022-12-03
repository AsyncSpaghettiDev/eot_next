interface eatontime {
    user: User
    login: (username: string, password: string) => void
    logout: () => void
    showLoading: (state: boolean) => void
}

interface User {
    auth: boolean
    username: string
    role: string
}