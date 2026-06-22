import api from "./api"

export interface Trip {
  _id: string
  busId: string
  routeId: {
    _id: string
    from: string
    to: string
  }
  departureTime: string
  arrivalTime: string
  fare: number
  bookedSeats: number[]
  totalSeats: number
}

export interface CreateTripPayload {
  busId: string
  routeId: string
  departureTime: string
  arrivalTime: string
  fare: number
}

export const getTrips = async (): Promise<Trip[]> => {
  const res = await api.get("/trips")
  return res.data?.data ?? res.data
}

export const getTripById = async (id: string): Promise<Trip> => {
  const res = await api.get(`/trips/${id}`)
  return res.data?.data ?? res.data
}

export const createTrip = async (payload: CreateTripPayload): Promise<Trip> => {
  const res = await api.post("/trips", payload)
  return res.data?.data ?? res.data
}
