import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Bus,
  MapPin,
  Clock,
  CheckCircle2,
  CalendarDays,
  Users,
  TrendingUp,
  AlertCircle,
} from "lucide-react"
import Navbar from "../components/Navbar"
import api from "../service/api"
import { useAuth } from "../hooks/useAuth"

interface Route {
  from: string
  to: string
}

interface Trip {
  _id: string
  routeId: Route | string
  departureTime: string
  arrivalTime: string
  fare: number
  bookedSeats: number[]
  totalSeats?: number
}

const DriverDashboard = () => {
  const { user } = useAuth()
  const [trips, setTrips] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        // Use the user dashboard endpoint which drivers can access
        // since it's protected only by authenticate (no role restriction)
        const res = await api.get("/auth/user/dashboard")
        const tripData = res.data?.trips ?? res.data?.data?.trips ?? []
        setTrips(Array.isArray(tripData) ? tripData : [])
      } catch (e: any) {
        const status = e?.response?.status
        if (status === 401 || status === 403) {
          setError("Authentication error. Please log in again.")
        } else {
          setError("Could not load trip data. Please try again.")
        }
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const now = new Date()
  const upcomingTrips = trips.filter((t) => new Date(t.departureTime) > now)
  const completedTrips = trips.filter((t) => new Date(t.departureTime) <= now)

  const totalSeatsBooked = trips.reduce(
    (acc, t) => acc + (t.bookedSeats?.length ?? 0),
    0
  )

  const stats = [
    {
      label: "Upcoming Trips",
      value: upcomingTrips.length,
      icon: CalendarDays,
      color: "from-green-500 to-emerald-400",
    },
    {
      label: "Completed Trips",
      value: completedTrips.length,
      icon: CheckCircle2,
      color: "from-blue-500 to-cyan-400",
    },
    {
      label: "Passengers Served",
      value: totalSeatsBooked,
      icon: Users,
      color: "from-purple-500 to-violet-400",
    },
    {
      label: "Total Trips",
      value: trips.length,
      icon: TrendingUp,
      color: "from-orange-500 to-amber-400",
    },
  ]

  const formatRoute = (routeId: Route | string) => {
    if (typeof routeId === "object" && routeId !== null) {
      return `${routeId.from} → ${routeId.to}`
    }
    return "Route"
  }

  return (
    <div className="relative min-h-screen bg-[#F7FAF7]">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-200 blur-3xl opacity-25" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-green-200 blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-emerald-100 blur-3xl opacity-30" />
      </div>

      <Navbar title="Driver Dashboard" />

      <div className="relative max-w-[1800px] mx-auto px-6 py-10">
        {/* Welcome Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-[40px] bg-white/70 backdrop-blur border border-green-100 p-8 md:p-10 shadow-xl mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-green-700">Driver Portal 👋</p>
              <h1 className="mt-2 text-5xl font-black tracking-tight text-green-950">
                {(user as any)?.name ?? (user as any)?.email ?? "Driver"}
              </h1>
              <p className="mt-3 text-gray-500 max-w-md">
                Your trips, routes and performance summary — all in one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-green-600 to-emerald-400 flex items-center justify-center shadow-lg">
                <Bus className="text-white" size={28} />
              </div>
              <div>
                <p className="font-black text-green-900 text-xl">On Duty</p>
                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  DRIVER
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
          {stats.map((s, i) => (
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

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="h-12 w-12 rounded-full border-4 border-green-300 border-t-green-700 animate-spin" />
          </div>
        ) : error ? (
          <div className="rounded-[32px] bg-red-50 border border-red-100 p-10 text-center">
            <AlertCircle size={32} className="mx-auto text-red-400 mb-3" />
            <p className="text-red-500 font-semibold">{error}</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Upcoming Trips */}
            <div>
              <h2 className="text-2xl font-black text-green-950 mb-4 flex items-center gap-2">
                <CalendarDays size={20} className="text-green-600" />
                Upcoming Trips
              </h2>
              <div className="space-y-4">
                {upcomingTrips.length === 0 ? (
                  <div className="rounded-[28px] bg-white/60 border border-green-100 p-8 text-center text-gray-400">
                    No upcoming trips scheduled.
                  </div>
                ) : (
                  upcomingTrips.map((t) => (
                    <motion.div
                      key={t._id}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-[28px] bg-white/70 backdrop-blur border border-green-100 p-5 shadow-lg"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-bold text-green-950">
                            {formatRoute(t.routeId)}
                          </h3>
                          <div className="mt-2 flex flex-col gap-1">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <Clock size={13} />
                              Departs: {new Date(t.departureTime).toLocaleString()}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <MapPin size={13} />
                              Arrives: {new Date(t.arrivalTime).toLocaleString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-black text-green-700">Rs {t.fare}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {t.bookedSeats?.length ?? 0} booked
                          </p>
                        </div>
                      </div>

                      {/* Seat fill bar */}
                      {t.totalSeats && (
                        <div className="mt-4">
                          <div className="flex justify-between text-xs text-gray-400 mb-1">
                            <span>Occupancy</span>
                            <span>{t.bookedSeats?.length ?? 0} / {t.totalSeats}</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-green-100">
                            <div
                              className="h-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                              style={{
                                width: `${Math.min(100, ((t.bookedSeats?.length ?? 0) / t.totalSeats) * 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ))
                )}
              </div>
            </div>

            {/* Completed Trips */}
            <div>
              <h2 className="text-2xl font-black text-green-950 mb-4 flex items-center gap-2">
                <CheckCircle2 size={20} className="text-blue-500" />
                Completed Trips
              </h2>
              <div className="space-y-4">
                {completedTrips.length === 0 ? (
                  <div className="rounded-[28px] bg-white/60 border border-green-100 p-8 text-center text-gray-400">
                    No completed trips yet.
                  </div>
                ) : (
                  completedTrips.slice(0, 5).map((t) => (
                    <motion.div
                      key={t._id}
                      whileHover={{ scale: 1.01 }}
                      className="rounded-[28px] bg-white/70 backdrop-blur border border-blue-100 p-5 shadow"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-green-900">
                            {formatRoute(t.routeId)}
                          </h3>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(t.departureTime).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                            Completed
                          </span>
                          <p className="text-sm font-bold text-green-700 mt-1">
                            {t.bookedSeats?.length ?? 0} passengers
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default DriverDashboard