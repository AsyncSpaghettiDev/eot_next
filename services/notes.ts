import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localAPI_URL:8000'

export const getNotes = async () => (await axios.get(`${API_URL}/notes`)).data
