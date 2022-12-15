import { Category } from "types"

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const getCategories = async () => {
    const res = await fetch(`${API_URL}/category`)
    const data = await res.json()
    return data
}

export const createCategory = async (category: Category) => {
    const res = await fetch(`${API_URL}/category`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(category),
        credentials: 'include'
    })
    const data = await res.json()
    return data
}