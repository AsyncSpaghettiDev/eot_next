import { createContext } from "react"

export const AuthContext = createContext<AuthenticateContext>(null!)

import { ReactNode, useEffect, useState } from "react"
import { AuthException } from '.'
import { check_session, login as authenticate, logout as deauthenticate } from 'services'

interface Props {
    children: ReactNode
}

const INITIAL_USER: User = {
    username: '',
    role: {
        sortId: 0,
        name: '',
        description: '',
        isStaff: false,
    },
}


export const GlobalAuth = ({ children }: Props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const [user, setUser] = useState<User>(INITIAL_USER)

    useEffect(() => {
        check_session().then((res) => {
            if (res) {
                setUser(res.user)
                setAuthenticated(res.authenticated)
            }
        }).catch((err) => {
            // compare err with AuthException
            if (err instanceof AuthException)
                throw err
            // alert(err)
        })
    }, [])

    const login = (username: string, password: string) => {
        authenticate(username, password).then((res) => {
            if (res) {
                setUser(res.user)
                setAuthenticated(res.authenticated)
            }
        }).catch((err) => {
            // compare err with AuthException
            if (err instanceof AuthException)
                throw err

            alert(err)
        })
    }

    const logout = () => {
        deauthenticate().then((res) => {
            if (res) {
                setUser(INITIAL_USER)
                setAuthenticated(false)
            }
        }).catch((err) => {
            // compare err with AuthException
            if (err instanceof AuthException)
                throw err

            alert(err)
        }
        )
    }

    const value = {
        user,
        authenticated,
        login,
        logout,
    }
    return <>
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    </>

}