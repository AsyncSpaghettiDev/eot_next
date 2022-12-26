import axios, { AxiosError } from "axios"
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localAPI_URL:8000'

export const getTables = async (Cookie?: string) => {
    const res = await axios.get(`${API_URL}/tables`, {
        withCredentials: true,
        headers: {
            Cookie,
        },
    })
    const data = await res.data
    return data
}

export const createTable = async (table: Table) => {
    const res = await axios.post(`${API_URL}/tables`, table, {
        withCredentials: true,
    })
    const data = await res.data
    return data
}

export const updateTable = async (tableId: number, table: any) => {
    try {
        const res = await axios.put(`${API_URL}/tables/${tableId}`, table, {
            withCredentials: true,
        })
        const data = await res.data
        return data
    }
    catch (error: AxiosError | any) {
        if (error instanceof AxiosError && error.response?.status === 409)
            return alert('La mesa está en uso')
    }
}

export const deleteTable = async (tableId: number) => {
    try {
        const res = await axios.delete(`${API_URL}/tables/${tableId}`, {
            withCredentials: true,
        })
        const data = await res.data
        return data
    }
    catch (error: AxiosError | any) {
        if (error instanceof AxiosError && error.response?.status === 409)
            return alert('La mesa está en uso')
    }
}