import api from "./api"

export interface BusRoute {
  _id: string
  from: string
  to: string
  distanceKm: number
  durationHours: number
}

export interface CreateRoutePayload {
  from: string
  to: string
  distanceKm: number
  durationHours: number
}

export const getRoutes = async (): Promise<BusRoute[]> => {
  const res = await api.get("/routes")
  return res.data?.data ?? res.data
}

export const createRoute = async (payload: CreateRoutePayload): Promise<BusRoute> => {
  const res = await api.post("/routes", payload)
  return res.data?.data ?? res.data
}
