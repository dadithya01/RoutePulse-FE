import api from "./api"

export interface Feedback {
  _id: string
  userId: string
  tripId: string
  rating: number
  comment: string
  createdAt: string
}

export interface CreateFeedbackPayload {
  tripId: string
  rating: number
  comment: string
}

export const getFeedback = async (): Promise<Feedback[]> => {
  const res = await api.get("/feedback")
  return res.data?.data ?? res.data
}

export const submitFeedback = async (
  payload: CreateFeedbackPayload
): Promise<Feedback> => {
  const res = await api.post("/feedback", payload)
  return res.data?.data ?? res.data
}
