import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Bus, MapPin, Clock, Search, ArrowRight, Ticket } from "lucide-react"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"
import SeatSelector from "../components/SeatSelector"
import { getTrips, type Trip } from "../service/trips"
import { bookSeats } from "../service/bookings"

const BookTripPage = () => {
  const [trips, setTrips] = useState<Trip[]>([])
  const [filtered, setFiltered] = useState<Trip[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  /* Booking modal */
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null)
  const [selectedSeats, setSelectedSeats] = useState<number[]>([])
  const [booking, setBooking] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    getTrips()
      .then((data) => {
        const arr = Array.isArray(data) ? data : []
        setTrips(arr)
        setFiltered(arr)
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])

  /* Filter */
  useEffect(() => {
    if (!search.trim()) {
      setFiltered(trips)
      return
    }
    const q = search.toLowerCase()
    setFiltered(
      trips.filter((t) => {
        if (typeof t.routeId === "object") {
          return (
            t.routeId.from.toLowerCase().includes(q) ||
            t.routeId.to.toLowerCase().includes(q)
          )
        }
        return false
      })
    )
  }, [search, trips])

  const handleToggleSeat = (seat: number) => {
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    )
  }

  const handleBook = async () => {
    if (!selectedTrip || selectedSeats.length === 0) {
      setBookingError("Please select at least one seat")
      return
    }
    setBooking(true)
    setBookingError("")
    try {
      await bookSeats(selectedTrip._id, selectedSeats)
      setSuccess(true)
      // Update local booked seats
      setTrips((prev) =>
        prev.map((t) =>
          t._id === selectedTrip._id
            ? { ...t, bookedSeats: [...(t.bookedSeats ?? []), ...selectedSeats] }
            : t
        )
      )
    } catch {
      setBookingError("Booking failed. Seats may already be taken.")
    } finally {
      setBooking(false)
    }
  }

  const handleCloseModal = () => {
    setSelectedTrip(null)
    setSelectedSeats([])
    setBookingError("")
    setSuccess(false)
  }

  const now = new Date()
  const upcomingFiltered = filtered.filter((t) => new Date(t.departureTime) > now)

  return (
    <div className="relative min-h-screen bg-[#F7FAF7]">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green-200 blur-3xl opacity-30" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-200 blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-lime-200 blur-3xl opacity-30" />
      </div>

      <Navbar title="Book a Trip" />

      <div className="relative max-w-[1800px] mx-auto px-6 py-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="text-sm font-semibold text-green-700">Travel Smarter</p>
          <h1 className="mt-1 text-5xl font-black text-green-950">Book a Trip</h1>
          <p className="mt-2 text-gray-500">Find your route, choose your seat, and go.</p>
        </motion.div>

        {/* Search Bar */}
        <div className="relative mb-8 max-w-xl">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by city (e.g. Colombo, Kandy)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-full border border-green-100 bg-white/70 backdrop-blur pl-10 pr-5 py-3.5 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 shadow-sm transition"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-12 w-12 rounded-full border-4 border-green-300 border-t-green-700 animate-spin" />
          </div>
        ) : upcomingFiltered.length === 0 ? (
          <div className="rounded-[32px] bg-white/60 border border-green-100 p-14 text-center">
            <Bus size={40} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-400 font-semibold">No upcoming trips found.</p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-3 text-green-700 text-sm underline">
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {upcomingFiltered.map((t, i) => {
                const available =
                  (t.totalSeats ?? 0) - (t.bookedSeats?.length ?? 0)
                const isFull = available <= 0

                return (
                  <motion.div
                    key={t._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg flex flex-col"
                  >
                    {/* Route */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center">
                        <Bus size={18} className="text-green-700" />
                      </div>
                      <div>
                        <h3 className="font-black text-green-950 text-lg">
                          {typeof t.routeId === "object"
                            ? `${t.routeId.from} → ${t.routeId.to}`
                            : "Route"}
                        </h3>
                        {typeof t.routeId === "object" && (
                          <p className="text-xs text-gray-400 flex items-center gap-1">
                            <MapPin size={10} /> {t.routeId.from} to {t.routeId.to}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Time info */}
                    <div className="space-y-1.5 text-sm text-gray-500 mb-5">
                      <div className="flex items-center gap-2">
                        <Clock size={13} />
                        <span>Departs: {new Date(t.departureTime).toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={13} className="opacity-40" />
                        <span>Arrives: {new Date(t.arrivalTime).toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto flex items-end justify-between">
                      <div>
                        <p className="text-3xl font-black text-green-700">Rs {t.fare}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {isFull ? (
                            <span className="text-red-500 font-semibold">Sold out</span>
                          ) : (
                            <span>{available} seats left</span>
                          )}
                        </p>
                      </div>

                      <button
                        disabled={isFull}
                        onClick={() => {
                          setSelectedTrip(t)
                          setSelectedSeats([])
                          setSuccess(false)
                          setBookingError("")
                        }}
                        className="flex items-center gap-2 rounded-full bg-green-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg hover:scale-105 transition disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Book <ArrowRight size={14} />
                      </button>
                    </div>

                    {/* Occupancy bar */}
                    {t.totalSeats && (
                      <div className="mt-4">
                        <div className="h-1.5 w-full rounded-full bg-green-100">
                          <div
                            className="h-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-400 transition-all"
                            style={{
                              width: `${Math.min(100, ((t.bookedSeats?.length ?? 0) / t.totalSeats) * 100)}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <Modal
        open={!!selectedTrip}
        onClose={handleCloseModal}
        title={
          success
            ? "Booking Confirmed! 🎉"
            : selectedTrip && typeof selectedTrip.routeId === "object"
            ? `${selectedTrip.routeId.from} → ${selectedTrip.routeId.to}`
            : "Select Seats"
        }
      >
        {success ? (
          <div className="text-center py-4">
            <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <Ticket size={28} className="text-green-700" />
            </div>
            <p className="text-xl font-black text-green-950 mb-2">You're all set!</p>
            <p className="text-gray-500 mb-1">Seats: <strong className="text-green-800">{selectedSeats.sort((a,b) => a-b).join(", ")}</strong></p>
            <p className="text-gray-500 mb-6">Total: <strong className="text-green-700">Rs {selectedSeats.length * (selectedTrip?.fare ?? 0)}</strong></p>
            <button
              onClick={handleCloseModal}
              className="w-full rounded-full bg-green-700 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {selectedTrip && (
              <>
                <p className="text-sm text-gray-500 mb-4">
                  Departs: {new Date(selectedTrip.departureTime).toLocaleString()}
                </p>

                <SeatSelector
                  totalSeats={selectedTrip.totalSeats ?? 50}
                  bookedSeats={selectedTrip.bookedSeats ?? []}
                  selectedSeats={selectedSeats}
                  onToggleSeat={handleToggleSeat}
                  fare={selectedTrip.fare}
                />

                {bookingError && (
                  <p className="mt-4 text-sm text-red-500">{bookingError}</p>
                )}

                <button
                  onClick={handleBook}
                  disabled={booking || selectedSeats.length === 0}
                  className="mt-5 w-full rounded-full bg-green-700 py-3 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {booking ? "Confirming..." : `Confirm Booking (${selectedSeats.length} seat${selectedSeats.length !== 1 ? "s" : ""})`}
                </button>
              </>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}

export default BookTripPage
