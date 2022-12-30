import { AuthException } from 'utils'
import { AES } from 'crypto-js'
import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const AES_SECRET = process.env.NEXT_PUBLIC_AES_KEY || 'secret'

export const login = async (username: string, password: string) => {
  const { data, status } = await axios.post(`${API_URL}/auth/login`, { username, password }, { withCredentials: true })
  if (status < 400) {
    const { passport: { user }, authenticated, cookie: { expires } } = data
    const { role: { name, isStaff }, tableId } = user
    const cookie = {
      authenticated,
      name,
      isStaff,
      tableId,
      expires
    }
    const token = AES.encrypt(JSON.stringify(cookie), AES_SECRET)

    document.cookie = `token=${token}; Expires=${new Date(expires).toUTCString()}; path=/;`
    return { user, authenticated }
  }
  if (status === 404) { throw new AuthException('User not found') }

  throw new Error('Something went wrong')
}

export const checkSession = async () => {
  const { data, status } = await axios.get(`${API_URL}/auth`, { withCredentials: true })
  if (status < 400) {
    const { passport: { user }, authenticated } = data
    return { user, authenticated }
  }
  if (status === 404) { throw new AuthException('User not found') }

  throw new Error('Something went wrong')
}

export const logout = async () => {
  const { data, status } = await axios.post(`${API_URL}/auth/logout`, { withCredentials: true })
  if (status < 400) {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
    return data
  }
  if (status === 404) { throw new AuthException('User not found') }

  throw new Error('Something went wrong')
}
