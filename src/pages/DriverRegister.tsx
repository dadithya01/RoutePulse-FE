import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../service/auth"
import { Bus, ArrowRight } from "lucide-react"

const DriverRegister = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [licenseNumber, setLicenseNumber] = useState("")
  const [licenseExpiry, setLicenseExpiry] = useState("")
  const [experienceYears, setExperienceYears] = useState("")
  const [emergencyContact, setEmergencyContact] = useState("")

  const navigate = useNavigate()

  const handleRegister = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !licenseNumber ||
      !licenseExpiry ||
      !experienceYears ||
      !emergencyContact
    ) {
      alert("Please fill all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      await register(name, email, password, {
        roles: ["DRIVER"],
        licenseNumber,
        licenseExpiry,
        experienceYears: Number(experienceYears),
        emergencyContact,
      })

      navigate("/login")
    } catch {
      alert("Driver registration failed")
    }
  }

  return (
  <div className="relative min-h-screen overflow-hidden bg-[#F8FAF7]">

    {/* 🌿 BACKGROUND SHAPES */}
    <div className="absolute inset-0">
      <div className="absolute -top-40 -left-40 h-[420px] w-[420px] rounded-full bg-green-200 blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/3 right-0 h-[520px] w-[520px] rounded-full bg-emerald-300 blur-3xl opacity-30 animate-bounce" />
      <div className="absolute bottom-0 left-1/3 h-[320px] w-[320px] rounded-full bg-lime-200 blur-3xl opacity-40 animate-pulse" />
    </div>

    {/* MAIN */}
    <div className="relative mx-auto grid min-h-screen max-w-[1800px] lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center px-10 lg:px-24">

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-2 border border-green-100 shadow-sm">
          <Bus size={16} className="text-green-700" />
          <span className="text-sm font-medium text-green-900">
            BusNet Driver Network
          </span>
        </div>

        <h1 className="mt-8 text-7xl font-black leading-[0.9] text-green-950">
          Join
          <br />
          Fleet.
        </h1>

        <p className="mt-6 max-w-md text-[#5F7465] text-lg">
          Become a verified driver, manage routes, and operate across the national transport network.
        </p>

        {/* SMALL STATS */}
        <div className="mt-12 grid max-w-md grid-cols-2 gap-4">

          <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-sm hover:scale-105 transition">
            <div className="text-3xl font-black text-green-900">100%</div>
            <p className="text-sm text-gray-500">Verified Drivers</p>
          </div>

          <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-6 shadow-sm hover:scale-105 transition">
            <div className="text-3xl font-black text-green-900">24/7</div>
            <p className="text-sm text-gray-500">Live Operations</p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-8">

        <div className="relative w-full max-w-xl rounded-[40px] bg-white/70 backdrop-blur-xl border border-green-100 p-10 shadow-[0_30px_120px_rgba(34,197,94,0.15)]">

          {/* glow */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-300 blur-3xl opacity-40" />

          {/* HEADER */}
          <h2 className="text-4xl font-black text-green-950">
            Driver Registration
          </h2>

          <p className="mt-2 text-gray-500">
            Fleet onboarding form
          </p>

          {/* AUTH SECTION */}
          <div className="mt-10 space-y-5">

            <input
              placeholder="Full Name"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              placeholder="Email"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

          </div>

          {/* DIVIDER */}
          <div className="my-8 flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-green-100" />
            <span className="text-xs text-gray-400">DRIVER DETAILS</span>
            <div className="h-[1px] flex-1 bg-green-100" />
          </div>

          {/* DRIVER SECTION */}
          <div className="space-y-5">

            <input
              placeholder="License Number"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
            />

            <input
              type="date"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={licenseExpiry}
              onChange={(e) => setLicenseExpiry(e.target.value)}
            />

            <input
              type="number"
              placeholder="Years of Experience"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            />

            <input
              placeholder="Emergency Contact"
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
            />

          </div>

          {/* BUTTON */}
          <button
            onClick={handleRegister}
            className="mt-10 w-full rounded-full bg-green-700 py-5 text-white font-semibold flex items-center justify-center gap-2 shadow-lg hover:scale-[1.02] transition"
          >
            Register as Driver
            <ArrowRight size={18} />
          </button>

          {/* FOOTER */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Already a driver?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-green-700 font-semibold hover:underline"
            >
              Login
            </button>
          </p>

        </div>
      </div>
    </div>
  </div>
)
}

export default DriverRegister