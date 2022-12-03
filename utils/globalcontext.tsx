import { ReactNode, useState } from "react"
import { EotContext } from '.'

interface Props {
    children: ReactNode
}

export const GlobalContext = ({ children }: Props) => {
    const [loading, setLoading] = useState(false)
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<User>({
        username: '',
        role: '',
        auth: false
    })

    const showLoading = (state: boolean) => setLoading(state)

    const login = (username: string, password: string) => {
        console.log(`login: ${username} ${password}`)
    }

    const logout = () => {
        console.log(`logout`)
    }

    const value = {
        user,
        authenticated,
        showLoading,
        login,
        logout,
    }
    return <>
        <EotContext.Provider value={value}>
            {children}
        </EotContext.Provider>
    </>

}