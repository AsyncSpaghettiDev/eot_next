import { AuthException } from "utils"
import { AES } from 'crypto-js'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const AES_SECRET = process.env.NEXT_PUBLIC_AES_KEY || 'secret'

export const login = async (username: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
    })

    const data = await response.json()
    if (response.ok) {
        const { passport: { user }, authenticated, cookie: { expires } } = data
        const { role: { name, isStaff }, tableId } = user
        const cookie = {
            authenticated,
            name,
            isStaff,
            tableId,
            expires,
        }
        const token = AES.encrypt(JSON.stringify(cookie), AES_SECRET)

        document.cookie = `token=${token}`
        return { user, authenticated }
    }
    if (response.status === 404)
        throw new AuthException('User not found')

    throw new Error('Something went wrong')
}

export const check_session = async () => {
    const response = await fetch(`${API_URL}/auth/`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'GET',
    })
    const data = await response.json()
    if (response.ok) {
        const { passport: { user }, authenticated } = data
        return { user, authenticated }
    }
    if (response.status === 404)
        throw new AuthException('User not found')

    throw new Error('Something went wrong')
}

export const logout = async () => {
    const response = await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
        credentials: 'include',
    })
    const data = await response.json()
    if (response.ok) {
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
        return data
    }
    if (response.status === 404)
        throw new AuthException('User not found')

    throw new Error('Something went wrong')
}