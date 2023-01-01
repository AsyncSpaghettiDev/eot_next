import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'

interface CreateOrder {
  quantity: number
  subtotal: number
  activityId: number
  plateId: number
}

export const getOrders = async (): Promise<ServerOrders> => {
  const { data } = await axios.get(`${API_URL}/orders`, { withCredentials: true })
  return data
}

export const getTableOrders = async (tableId: string): Promise<Order[]> => (await axios.get(`${API_URL}/tables/${tableId}/orders`)).data

export const getOrder = async (id: number): Promise<Order> => (await axios.get(`${API_URL}/orders/${id}`)).data

export const getOrderStatus = async (id: number): Promise<Status> => {
  const { data } = await axios.get(`${API_URL}/orders/${id}/status`, { withCredentials: true })
  return data
}

export const createOrder = async (order: CreateOrder): Promise<Order> => {
  const { data } = await axios.post(`${API_URL}/orders`, order, { withCredentials: true })
  return data
}

export const updateOrderStatus = async (id: number, statusId: number): Promise<Order> => {
  const { data } = await axios.put(`${API_URL}/orders/${id}`, { statusId }, { withCredentials: true })
  return data
}

export const requestOrderCancellation = async (id: number): Promise<Order> => {
  const { data } = await axios.post(`${API_URL}/orders/cancel/${id}`, {}, { withCredentials: true })
  return data
}

export const cancelOrder = async (id: number): Promise<Order> => {
  const { data } = await axios.put(`${API_URL}/orders/cancel/${id}`, {}, { withCredentials: true })
  return data
}
