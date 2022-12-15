import { NextPageContext } from "next"
import { parse } from 'cookie'
import { AES, enc } from 'crypto-js'
import { Token } from "types"
import { UserNotAuthenticatedException } from "./exceptions"

const AES_SECRET = process.env.NEXT_PUBLIC_AES_KEY || 'secret'

export const authorize = (context: NextPageContext): Token => {
    const { req } = context
    if (!req) throw new UserNotAuthenticatedException()
    const { headers: { cookie } } = req
    if (!cookie) throw new UserNotAuthenticatedException()
    const token = parse(cookie)?.token
    if (!token) throw new UserNotAuthenticatedException()

    const data = JSON.parse(AES.decrypt(token, AES_SECRET).toString(enc.Utf8))
    const expired = new Date(data.expires) < new Date()
    return { ...data, expired }
}


export const redirectLogin = {
    redirect: {
        destination: "/login",
        permanent: false
    }
}

export const redirectHome = {
    redirect: {
        destination: "/",
        permanent: false
    }
}