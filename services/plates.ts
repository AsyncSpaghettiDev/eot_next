import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localAPI_URL:8000'

export const menus = {}

export const getMenu = async () => (await axios.get(`${API_URL}/plates`)).data

export const createPlate = async (plateInfo: Plate) => (await axios.post(`${API_URL}/plates`, plateInfo, { withCredentials: true })).data

export const updatePlate = async (plateInfo: Plate) => (await axios.put(`${API_URL}/plates/${plateInfo.id}`, plateInfo, { withCredentials: true })).data

export const deletePlate = async (id: number) => (await axios.delete(`${API_URL}/plates/${id}`, { withCredentials: true })).data
