import { createContext, ReactNode, useEffect, useState } from 'react'

import { AuthException } from '.'
import { checkSession, login as authenticate, logout as deauthenticate } from 'services'
import { useRouter } from 'next/router'

export const AuthContext = createContext<AuthenticateContext>(null!)

interface Props {
  initialAuth?: any
  children: ReactNode
}

const INITIAL_USER: User = {
  username: '',
  role: {
    sortId: 0,
    name: '',
    description: '',
    isStaff: false
  }
}

export const GlobalAuth = ({ children, initialAuth }: Props) => {
  const [authenticated, setAuthenticated] = useState<boolean>(false)
  const [user, setUser] = useState<User>(INITIAL_USER)
  const router = useRouter()

  useEffect(() => {
    checkSession().then((res) => {
      if (res) {
        setUser(res.user)
        setAuthenticated(res.authenticated)
      }
    }).catch((err) => {
      // compare err with AuthException
      if (err instanceof AuthException) { throw err }
      // alert(err)
    })
  }, [])

  const login = async (username: string, password: string): Promise<void> => {
    try {
      const res = await authenticate(username, password)
      if (res) {
        setUser(res.user)
        setAuthenticated(res.authenticated)
      }
      Promise.resolve()
    } catch (err) {
      // compare err with AuthException
      if (err instanceof AuthException) { throw err }

      alert(err)
    }
  }

  const logout = async (redirect: boolean = true): Promise<void> => {
    try {
      const res = await deauthenticate()
      if (res) {
        setUser(INITIAL_USER)
        setAuthenticated(false)
        if (redirect) { router.push('/') }
        Promise.resolve()
      }
    } catch (err) {
      // compare err with AuthException
      if (err instanceof AuthException) { throw err }

      alert(err)
    }
  }

  const value = {
    user,
    authenticated,
    login,
    logout
  }
  return <>
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  </>
}
