import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const getCategories = async () => (await axios.get(`${API_URL}/category`)).data

export const createCategory = async (category: Category) => (await axios.post(`${API_URL}/category`, category)).data
