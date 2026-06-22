import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Bus, Ticket, MapPin, Clock, X, ChevronRight } from "lucide-react"
import { useNavigate } from "react-router-dom"
import api from "../service/api"
import { type Booking } from "../service/bookings"
import Navbar from "../components/Navbar"

interface User {
  _id: string
  name: string
  email: string
}

interface Trip {
  _id: string
  routeId: { from: string; to: string }
  departureTime: string
  fare: number
  bookedSeats: number[]
  totalSeats: number
}

interface DashboardData {
  user: User
  bookings: Booking[]
  trips: Trip[]
}

const UserDashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [cancellingId] = useState<string | null>(null)
  const navigate = useNavigate()

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/auth/user/dashboard")
      // Backend returns { user, bookings, trips } directly (no data wrapper)
      const payload = res.data?.data ?? res.data
      if (payload?.user) {
        setData({
          user: payload.user,
          bookings: Array.isArray(payload.bookings) ? payload.bookings : [],
          trips: Array.isArray(payload.trips) ? payload.trips : [],
        })
      } else {
        console.error("Unexpected dashboard shape:", res.data)
      }
    } catch (err: any) {
      console.error("Dashboard Error:", err?.response?.status, err?.response?.data ?? err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboard()
  }, [])

  const handleCancel = async (_bookingId: string) => {
    alert("To cancel a booking, please contact support.")
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7FAF7]">
        <div className="h-12 w-12 rounded-full border-4 border-green-300 border-t-green-700 animate-spin" />
      </div>
    )
  }

  if (!data) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7FAF7] gap-4">
        <p className="text-red-500 font-semibold">Failed to load dashboard.</p>
        <button
          onClick={fetchDashboard}
          className="rounded-full bg-green-700 px-6 py-3 text-white font-semibold hover:scale-105 transition"
        >
          Retry
        </button>
      </div>
    )
  }

  const confirmedBookings = data.bookings.filter((b) => b.status === "CONFIRMED")
  const cancelledBookings = data.bookings.filter((b) => b.status === "CANCELLED")
  const now = new Date()
  const upcomingTrips = data.trips.filter((t) => new Date(t.departureTime) > now)

  return (
    <div className="relative min-h-screen bg-[#F7FAF7]">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green-200 blur-3xl opacity-30" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-200 blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-lime-200 blur-3xl opacity-30" />
      </div>

      <Navbar title="My Dashboard" />

      <div className="relative max-w-[1800px] mx-auto px-6 py-10">

        {/* Hero welcome card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] bg-white/70 backdrop-blur border border-green-100 p-8 md:p-12 shadow-xl mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-green-700">Welcome back 👋</p>
              <h1 className="mt-2 text-6xl font-black tracking-tight text-green-950">
                {data.user.name}
              </h1>
              <p className="mt-3 text-gray-500 max-w-md">
                Manage your bookings, browse trips and travel smarter.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/book-trip")}
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 px-7 py-4 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                <Ticket size={18} /> Book Trip
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById("bookings-section")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
                className="flex items-center gap-2 rounded-full bg-white/80 border border-green-100 px-7 py-4 font-semibold hover:bg-green-50 hover:scale-105 transition shadow"
              >
                View Tickets
              </button>
            </div>
          </div>
        </motion.div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {[
            { icon: Ticket, label: "Total Bookings", value: data.bookings.length, color: "from-green-500 to-emerald-400" },
            { icon: Bus, label: "Available Trips", value: upcomingTrips.length, color: "from-blue-500 to-cyan-400" },
            { icon: MapPin, label: "Confirmed", value: confirmedBookings.length, color: "from-purple-500 to-violet-400" },
            { icon: X, label: "Cancelled", value: cancelledBookings.length, color: "from-red-400 to-rose-400" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg"
            >
              <div className={`h-10 w-10 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center shadow-md`}>
                <s.icon className="text-white" size={18} />
              </div>
              <p className="mt-4 text-4xl font-black text-green-950">{s.value}</p>
              <p className="mt-1 text-sm text-gray-500">{s.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Bookings */}
        <section id="bookings-section" className="mb-12">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-3xl font-black text-green-950">Your Bookings</h2>
            <button
              onClick={() => navigate("/book-trip")}
              className="flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline"
            >
              Book new <ChevronRight size={14} />
            </button>
          </div>

          {data.bookings.length === 0 ? (
            <div className="rounded-[32px] bg-white/60 border border-green-100 p-14 text-center">
              <Ticket size={40} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-400 font-semibold">No bookings yet.</p>
              <button
                onClick={() => navigate("/book-trip")}
                className="mt-4 rounded-full bg-green-700 px-7 py-3 text-white font-semibold hover:scale-105 transition shadow-lg text-sm"
              >
                Book Your First Trip
              </button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {data.bookings.map((b) => (
                <motion.div
                  key={b._id}
                  whileHover={{ scale: 1.01 }}
                  className={`rounded-[28px] bg-white/70 backdrop-blur border p-6 shadow-lg transition ${
                    b.status === "CANCELLED"
                      ? "border-red-100 opacity-70"
                      : "border-green-100"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-950">
                        {b.tripId?.routeId?.from} → {b.tripId?.routeId?.to}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Seats:{" "}
                        <span className="font-semibold text-green-800">
                          {b.seatNumbers.join(", ")}
                        </span>
                      </p>
                      {b.tripId?.departureTime && (
                        <div className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-400">
                          <Clock size={11} />
                          {new Date(b.tripId.departureTime).toLocaleString()}
                        </div>
                      )}
                    </div>

                    <div className="text-right shrink-0">
                      <p className="text-2xl font-black text-green-700">
                        Rs {b.totalPaid}
                      </p>
                      <span
                        className={`mt-1 inline-block rounded-full px-3 py-1 text-xs font-bold ${
                          b.status === "CONFIRMED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {b.status}
                      </span>

                      {b.status === "CONFIRMED" && (
                        <button
                          onClick={() => handleCancel(b._id)}
                          disabled={cancellingId === b._id}
                          className="mt-2 block text-xs text-red-400 hover:text-red-600 hover:underline transition disabled:opacity-50"
                        >
                          {cancellingId === b._id ? "Cancelling..." : "Cancel"}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </section>

        {/* Available Trips */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-3xl font-black text-green-950">Available Trips</h2>
            <button
              onClick={() => navigate("/book-trip")}
              className="flex items-center gap-1 text-sm font-semibold text-green-700 hover:underline"
            >
              Browse all <ChevronRight size={14} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTrips.slice(0, 6).map((t) => {
              const available = (t.totalSeats ?? 0) - (t.bookedSeats?.length ?? 0)
              return (
                <motion.div
                  key={t._id}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="rounded-[28px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-green-950">
                        {t.routeId.from} → {t.routeId.to}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                        <Clock size={13} />
                        {new Date(t.departureTime).toLocaleString()}
                      </p>
                    </div>
                    <p className="text-3xl font-black text-green-700">Rs {t.fare}</p>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <p className="text-xs text-gray-400">{available} seats left</p>
                    <button
                      onClick={() => navigate("/book-trip")}
                      className="flex items-center gap-2 rounded-full bg-green-700 px-4 py-2 text-xs font-semibold text-white hover:scale-105 transition shadow"
                    >
                      Book <ChevronRight size={12} />
                    </button>
                  </div>

                  {t.totalSeats && (
                    <div className="mt-3 h-1.5 w-full rounded-full bg-green-100">
                      <div
                        className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400"
                        style={{
                          width: `${Math.min(100, ((t.bookedSeats?.length ?? 0) / t.totalSeats) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </motion.div>
              )
            })}

            {upcomingTrips.length === 0 && (
              <div className="md:col-span-3 rounded-[28px] bg-white/60 border border-green-100 p-10 text-center text-gray-400">
                No upcoming trips available.
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  )
}

export default UserDashboard