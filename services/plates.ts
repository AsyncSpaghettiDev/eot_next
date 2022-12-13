const HOST = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const menus = {}

export const getPlates = async () => {
    const res = await fetch(`${HOST}/plates`)
    const data = await res.json()
    return data
}