import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import {
  Bus,
  Route,
  Ticket,
  Plus,
  LayoutDashboard,
  TrendingUp,
  MapPin,
  Users,
  ChevronRight,
} from "lucide-react"
import Navbar from "../components/Navbar"
import Modal from "../components/Modal"
import { getTrips, createTrip, type Trip } from "../service/trips"
import { getRoutes, createRoute, type BusRoute } from "../service/routes"
import { getBuses, createBus, type Bus as BusType } from "../service/buses"

type Tab = "overview" | "trips" | "routes" | "buses"

const inputCls =
  "w-full rounded-2xl border border-green-100 bg-white/60 px-4 py-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
const labelCls = "block text-xs font-semibold text-green-800 mb-1 uppercase tracking-wide"

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<Tab>("overview")

  /* --- Data --- */
  const [trips, setTrips] = useState<Trip[]>([])
  const [routes, setRoutes] = useState<BusRoute[]>([])
  const [buses, setBuses] = useState<BusType[]>([])
  const [loading, setLoading] = useState(true)

  /* --- Modals --- */
  const [tripModal, setTripModal] = useState(false)
  const [routeModal, setRouteModal] = useState(false)
  const [busModal, setBusModal] = useState(false)

  /* --- Trip form --- */
  const [tripForm, setTripForm] = useState({
    busId: "",
    routeId: "",
    departureTime: "",
    arrivalTime: "",
    fare: "",
  })

  /* --- Route form --- */
  const [routeForm, setRouteForm] = useState({
    from: "",
    to: "",
    distanceKm: "",
    durationHours: "",
  })

  /* --- Bus form --- */
  const [busForm, setBusForm] = useState({
    plateNumber: "",
    totalSeats: "",
    model: "",
  })

  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  /* --- Fetch all data --- */
  useEffect(() => {
    const loadAll = async () => {
      setLoading(true)
      try {
        const [t, r, b] = await Promise.all([getTrips(), getRoutes(), getBuses()])
        setTrips(Array.isArray(t) ? t : [])
        setRoutes(Array.isArray(r) ? r : [])
        setBuses(Array.isArray(b) ? b : [])
      } catch (e) {
        console.error(e)
      } finally {
        setLoading(false)
      }
    }
    loadAll()
  }, [])

  /* --- Handlers --- */
  const handleCreateTrip = async () => {
    if (!tripForm.busId || !tripForm.routeId || !tripForm.departureTime || !tripForm.arrivalTime || !tripForm.fare) {
      setError("Please fill all fields")
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const t = await createTrip({
  busId: tripForm.busId,
  routeId: tripForm.routeId,
  departureTime: new Date(tripForm.departureTime).toISOString(),
  arrivalTime: new Date(tripForm.arrivalTime).toISOString(),
  fare: Number(tripForm.fare),
})
      setTrips((prev) => [t, ...prev])
      setTripModal(false)
      setTripForm({ busId: "", routeId: "", departureTime: "", arrivalTime: "", fare: "" })
    } catch {
      setError("Failed to create trip")
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateRoute = async () => {
    if (!routeForm.from || !routeForm.to) {
      setError("From and To are required")
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const r = await createRoute({
        from: routeForm.from,
        to: routeForm.to,
        distanceKm: Number(routeForm.distanceKm),
        durationHours: Number(routeForm.durationHours),
      })
      setRoutes((prev) => [r, ...prev])
      setRouteModal(false)
      setRouteForm({ from: "", to: "", distanceKm: "", durationHours: "" })
    } catch {
      setError("Failed to create route")
    } finally {
      setSubmitting(false)
    }
  }

  const handleCreateBus = async () => {
    if (!busForm.plateNumber || !busForm.totalSeats) {
      setError("Plate number and total seats are required")
      return
    }
    setSubmitting(true)
    setError("")
    try {
      const b = await createBus({
        plateNumber: busForm.plateNumber,
        totalSeats: Number(busForm.totalSeats),
        model: busForm.model || undefined,
      })
      setBuses((prev) => [b, ...prev])
      setBusModal(false)
      setBusForm({ plateNumber: "", totalSeats: "", model: "" })
    } catch {
      setError("Failed to create bus")
    } finally {
      setSubmitting(false)
    }
  }

  const tabs: { id: Tab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "trips", label: "Trips", icon: Ticket },
    { id: "routes", label: "Routes", icon: Route },
    { id: "buses", label: "Buses", icon: Bus },
  ]

  const stats = [
    { label: "Total Trips", value: trips.length, icon: Ticket, color: "from-green-500 to-emerald-400" },
    { label: "Total Routes", value: routes.length, icon: Route, color: "from-blue-500 to-cyan-400" },
    { label: "Total Buses", value: buses.length, icon: Bus, color: "from-purple-500 to-violet-400" },
    { label: "Active Network", value: "Live", icon: TrendingUp, color: "from-orange-500 to-amber-400" },
  ]

  return (
    <div className="relative min-h-screen bg-[#F7FAF7]">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-green-200 blur-3xl opacity-30" />
        <div className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full bg-emerald-200 blur-3xl opacity-20" />
        <div className="absolute bottom-0 left-1/4 h-[400px] w-[400px] rounded-full bg-lime-200 blur-3xl opacity-30" />
      </div>

      <Navbar title="Admin Dashboard" />

      <div className="relative max-w-[1800px] mx-auto px-6 py-10">
        {/* Page title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-sm font-semibold text-green-700">System Admin</p>
          <h1 className="text-5xl font-black text-green-950 mt-1">Control Center</h1>
          <p className="mt-2 text-gray-500">Manage routes, buses, trips and monitor network health.</p>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-green-700 text-white shadow-lg"
                  : "bg-white/70 text-gray-600 border border-green-100 hover:bg-green-50"
              }`}
            >
              <tab.icon size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="h-12 w-12 rounded-full border-4 border-green-300 border-t-green-700 animate-spin" />
          </div>
        ) : (
          <>
            {/* ── OVERVIEW ── */}
            {activeTab === "overview" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {/* Stats cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                  {stats.map((s) => (
                    <motion.div
                      key={s.label}
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

                {/* Quick lists */}
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Recent Trips */}
                  <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-black text-green-950">Recent Trips</h2>
                      <button onClick={() => setActiveTab("trips")} className="flex items-center gap-1 text-sm text-green-700 font-semibold hover:underline">
                        View all <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="space-y-3">
                      {trips.slice(0, 4).map((t) => (
                        <div key={t._id} className="flex items-center justify-between rounded-2xl bg-green-50 p-4">
                          <div>
                            <p className="font-bold text-green-900">
                              {typeof t.routeId === "object" ? `${t.routeId.from} → ${t.routeId.to}` : "Route"}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{new Date(t.departureTime).toLocaleString()}</p>
                          </div>
                          <p className="font-black text-green-700">Rs {t.fare}</p>
                        </div>
                      ))}
                      {trips.length === 0 && <p className="text-gray-400 text-sm">No trips yet.</p>}
                    </div>
                  </div>

                  {/* Routes */}
                  <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-black text-green-950">Routes</h2>
                      <button onClick={() => setActiveTab("routes")} className="flex items-center gap-1 text-sm text-green-700 font-semibold hover:underline">
                        View all <ChevronRight size={14} />
                      </button>
                    </div>
                    <div className="space-y-2">
                      {routes.slice(0, 5).map((r) => (
                        <div key={r._id} className="flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-3">
                          <MapPin size={14} className="text-blue-500 shrink-0" />
                          <p className="text-sm font-semibold text-blue-900">{r.from} → {r.to}</p>
                        </div>
                      ))}
                      {routes.length === 0 && <p className="text-gray-400 text-sm">No routes yet.</p>}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ── TRIPS ── */}
            {activeTab === "trips" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-green-950">All Trips</h2>
                  <button
                    onClick={() => { setTripModal(true); setError("") }}
                    className="flex items-center gap-2 rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
                  >
                    <Plus size={16} /> Add Trip
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  {trips.map((t) => (
                    <div key={t._id} className="rounded-[28px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg hover:scale-[1.01] transition">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xl font-bold text-green-950">
                            {typeof t.routeId === "object" ? `${t.routeId.from} → ${t.routeId.to}` : "Route"}
                          </h3>
                          <p className="text-sm text-gray-500 mt-1">Departs: {new Date(t.departureTime).toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Arrives: {new Date(t.arrivalTime).toLocaleString()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-black text-green-700">Rs {t.fare}</p>
                          <p className="text-xs text-gray-400 mt-1">
                            {t.bookedSeats?.length ?? 0} / {t.totalSeats ?? "?"} seats booked
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                  {trips.length === 0 && (
                    <div className="md:col-span-2 rounded-[28px] bg-white/50 border border-green-100 p-10 text-center text-gray-400">
                      No trips yet. Click "Add Trip" to create one.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── ROUTES ── */}
            {activeTab === "routes" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-green-950">All Routes</h2>
                  <button
                    onClick={() => { setRouteModal(true); setError("") }}
                    className="flex items-center gap-2 rounded-full bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg hover:scale-105 transition"
                  >
                    <Plus size={16} /> Add Route
                  </button>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {routes.map((r) => (
                    <div key={r._id} className="rounded-[28px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg hover:-translate-y-1 transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-full bg-blue-100 flex items-center justify-center">
                          <MapPin size={16} className="text-blue-600" />
                        </div>
                        <h3 className="text-lg font-bold text-green-950">{r.from} → {r.to}</h3>
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        {r.distanceKm && <span>{r.distanceKm} km</span>}
                        {r.durationHours && <span>{r.durationHours} hr</span>}
                      </div>
                    </div>
                  ))}
                  {routes.length === 0 && (
                    <div className="md:col-span-3 rounded-[28px] bg-white/50 border border-green-100 p-10 text-center text-gray-400">
                      No routes yet. Click "Add Route" to create one.
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {/* ── BUSES ── */}
            {activeTab === "buses" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-3xl font-black text-green-950">All Buses</h2>
                  <span className="text-xs text-gray-400 bg-yellow-50 border border-yellow-100 rounded-full px-4 py-2">
                    Buses are registered by drivers
                  </span>
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {buses.map((b) => (
                    <div key={b._id} className="rounded-[28px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-lg hover:-translate-y-1 transition">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-9 w-9 rounded-full bg-purple-100 flex items-center justify-center">
                          <Bus size={16} className="text-purple-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-green-950">{b.plateNumber}</h3>
                          {b.model && <p className="text-xs text-gray-400">{b.model}</p>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{b.totalSeats} seats</p>
                    </div>
                  ))}
                  {buses.length === 0 && (
                    <div className="md:col-span-3 rounded-[28px] bg-white/50 border border-green-100 p-10 text-center text-gray-400">
                      No buses yet. Click "Add Bus" to create one.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>

      {/* ─────────── MODALS ─────────── */}

      {/* Add Trip Modal */}
      <Modal open={tripModal} onClose={() => setTripModal(false)} title="Add New Trip">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Route</label>
            <select
              value={tripForm.routeId}
              onChange={(e) => setTripForm((f) => ({ ...f, routeId: e.target.value }))}
              className={inputCls}
            >
              <option value="">Select Route</option>
              {routes.map((r) => (
                <option key={r._id} value={r._id}>{r.from} → {r.to}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Bus</label>
            <select
              value={tripForm.busId}
              onChange={(e) => setTripForm((f) => ({ ...f, busId: e.target.value }))}
              className={inputCls}
            >
              <option value="">Select Bus</option>
              {buses.map((b) => (
                <option key={b._id} value={b._id}>{b.plateNumber} ({b.totalSeats} seats)</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelCls}>Departure Time</label>
            <input type="datetime-local" className={inputCls} value={tripForm.departureTime}
              onChange={(e) => setTripForm((f) => ({ ...f, departureTime: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Arrival Time</label>
            <input type="datetime-local" className={inputCls} value={tripForm.arrivalTime}
              onChange={(e) => setTripForm((f) => ({ ...f, arrivalTime: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Fare (Rs)</label>
            <input type="number" placeholder="e.g. 350" className={inputCls} value={tripForm.fare}
              onChange={(e) => setTripForm((f) => ({ ...f, fare: e.target.value }))} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleCreateTrip}
            disabled={submitting}
            className="w-full rounded-full bg-green-700 py-3 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Trip"}
          </button>
        </div>
      </Modal>

      {/* Add Route Modal */}
      <Modal open={routeModal} onClose={() => setRouteModal(false)} title="Add New Route">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>From</label>
            <input placeholder="e.g. Colombo" className={inputCls} value={routeForm.from}
              onChange={(e) => setRouteForm((f) => ({ ...f, from: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>To</label>
            <input placeholder="e.g. Kandy" className={inputCls} value={routeForm.to}
              onChange={(e) => setRouteForm((f) => ({ ...f, to: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Distance (km) — optional</label>
            <input type="number" placeholder="e.g. 115" className={inputCls} value={routeForm.distanceKm}
              onChange={(e) => setRouteForm((f) => ({ ...f, distanceKm: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Duration (hours)</label>
            <input type="number" placeholder="e.g. 3" className={inputCls} value={routeForm.durationHours}
              onChange={(e) => setRouteForm((f) => ({ ...f, durationHours: e.target.value }))} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleCreateRoute}
            disabled={submitting}
            className="w-full rounded-full bg-green-700 py-3 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Route"}
          </button>
        </div>
      </Modal>

      {/* Add Bus Modal */}
      <Modal open={busModal} onClose={() => setBusModal(false)} title="Add New Bus">
        <div className="space-y-4">
          <div>
            <label className={labelCls}>Plate Number</label>
            <input placeholder="e.g. CAB-1234" className={inputCls} value={busForm.plateNumber}
              onChange={(e) => setBusForm((f) => ({ ...f, plateNumber: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Total Seats</label>
            <input type="number" placeholder="e.g. 50" className={inputCls} value={busForm.totalSeats}
              onChange={(e) => setBusForm((f) => ({ ...f, totalSeats: e.target.value }))} />
          </div>
          <div>
            <label className={labelCls}>Model — optional</label>
            <input placeholder="e.g. Volvo B11R" className={inputCls} value={busForm.model}
              onChange={(e) => setBusForm((f) => ({ ...f, model: e.target.value }))} />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            onClick={handleCreateBus}
            disabled={submitting}
            className="w-full rounded-full bg-green-700 py-3 text-white font-semibold hover:scale-[1.02] transition disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Add Bus"}
          </button>
        </div>
      </Modal>
    </div>
  )
}

export default AdminDashboard