import { AuthException } from "utils"

const HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const login = async (username: string, password: string) => {
    const response = await fetch(`${HOST}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
    })

    const data = await response.json()
    if (response.ok) {
        localStorage.setItem('token', data.token)
        const { passport: { user }, authenticated } = data
        return { user, authenticated }
    }
    if (response.status === 404)
        throw new AuthException('User not found')

    throw new Error('Something went wrong')
}

export const check_session = async () => {
    const response = await fetch(`${HOST}/auth/${localStorage.getItem('token')}`)
    const data = await response.json()

    if (response.ok) {
        const { passport: { user }, authenticated } = JSON.parse(data.json)
        return { user, authenticated }
    }
    if (response.status === 404)
        throw new AuthException('User not found')

    throw new Error('Something went wrong')
}

export const logout = async () => {
    const response = await fetch(`${HOST}/auth/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token: localStorage.getItem('token') }),
    })
    const data = await response.json()
    if (response.ok) {
        localStorage.removeItem('token')
        return data
    }
    if (response.status === 404)
        throw new AuthException('User not found')

    throw new Error('Something went wrong')
}