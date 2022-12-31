import axios, { AxiosError } from 'axios'
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

export const getActivity = async (tableId: number): Promise<Activity> => (await axios.get(`${API_URL}/activity/table/${tableId}`)).data

export const createActivity = async (activity: Activity) => {
  const response = await axios.post(`${API_URL}/activity`, activity, {
    withCredentials: true
  })
  return response.data
}

export const updateActivity = async (activityId: number) => {
  const response = await axios.put(`${API_URL}/activity/${activityId}`, {}, {
    withCredentials: true
  })
  return response.data
}

export const deleteActivity = async (activityId: number) => {
  try {
    const response = await axios.delete(`${API_URL}/activity/${activityId}`, {
      withCredentials: true
    })

    return response.data
  } catch (error: AxiosError | any) {
    if (error instanceof AxiosError && error.response?.status === 409) { return alert('La mesa sigue en uso') }
  }
}
