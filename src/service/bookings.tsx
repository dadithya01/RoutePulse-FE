import api from "./api"

export interface Booking {
  _id: string
  tripId: {
    _id: string
    routeId: { from: string; to: string }
    departureTime: string
    fare: number
  }
  userId: string
  seatNumbers: number[]
  totalPaid: number
  status: "CONFIRMED" | "CANCELLED"
}

export const bookSeats = async (
  tripId: string,
  seatNumbers: number[]
): Promise<Booking> => {
  const res = await api.post("/bookings", { tripId, seatNumbers })
  return res.data?.data ?? res.data
}

export const getMyBookings = async (): Promise<Booking[]> => {
  // Backend route: GET /bookings/my-history
  const res = await api.get("/bookings/my-history")
  return res.data?.data ?? res.data
}

// Note: Backend does not have a cancel endpoint yet.
// If added later, use: PATCH /bookings/:id/cancel
export const cancelBooking = async (bookingId: string): Promise<void> => {
  await api.patch(`/bookings/${bookingId}/cancel`)
}
