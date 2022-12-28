const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localAPI_URL:8000'

export const menus = {}

export const getMenu = async () => {
  const res = await fetch(`${API_URL}/plates`)
  const data = await res.json()
  return data
}

export const createPlate = async (plateInfo: Plate) => {
  const res = await fetch(`${API_URL}/plates`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plateInfo),
    credentials: 'include'
  })
  const data = await res.json()
  return data
}

export const updatePlate = async (plateInfo: Plate) => {
  const res = await fetch(`${API_URL}/plates/${plateInfo.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(plateInfo),
    credentials: 'include'
  })
  const data = await res.json()
  return data
}

export const deletePlate = async (id: number) => {
  const res = await fetch(`${API_URL}/plates/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  const data = await res.json()
  return data
}
