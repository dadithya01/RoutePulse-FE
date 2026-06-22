import api from "./api"

export interface Bus {
  _id: string
  plateNumber: string
  totalSeats: number
  driverId?: string
  model?: string
}

export interface CreateBusPayload {
  plateNumber: string
  totalSeats: number
  driverId?: string
  model?: string
}

export const getBuses = async (): Promise<Bus[]> => {
  const res = await api.get("/buses")
  return res.data?.data ?? res.data
}

export const createBus = async (payload: CreateBusPayload): Promise<Bus> => {
  const res = await api.post("/buses", payload)
  return res.data?.data ?? res.data
}
