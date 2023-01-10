import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localAPI_URL:8000'

export const getEmployees = async (): Promise<Employee[]> => {
  const { data } = await axios.get(`${API_URL}/users/employees`, {
    withCredentials: true
  })
  return data
}

export const getEmployeesRoles = async (): Promise<Role[]> => {
  const { data } = await axios.get(`${API_URL}/roles/employees`, {
    withCredentials: true
  })
  return data
}

export const createEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
  const { data } = await axios.post(`${API_URL}/users`, employee, {
    withCredentials: true
  })
  return data
}

export const updateEmployee = async (employee: Partial<Employee>): Promise<Employee> => {
  const { data } = await axios.put(`${API_URL}/users/${employee.id}`, employee, {
    withCredentials: true
  })
  return data
}

export const deleteEmployee = async (id: number): Promise<Employee> => {
  const { data } = await axios.delete(`${API_URL}/users/${id}`, {
    withCredentials: true
  })
  return data
}
