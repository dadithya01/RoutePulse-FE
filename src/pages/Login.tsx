import { ArrowRight, Bus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getMyDetails, login } from "../service/auth"
import { useAuth } from "../hooks/useAuth"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const { setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    try {
      const data = await login(email, password)

      if (data?.data?.accessToken) {
        localStorage.setItem(
          "accessToken",
          data.data.accessToken
        )

        localStorage.setItem(
          "refreshToken",
          data.data.refreshToken
        )

        const resData = await getMyDetails()
        const userData = resData?.data

        setUser(userData)

        if (userData?.roles?.includes("ADMIN")) {
          navigate("/admin-dashboard")
        } else if (userData?.roles?.includes("DRIVER")) {
          navigate("/driver-dashboard")
        } else if (userData?.roles?.includes("USER")) {
          navigate("/user-dashboard")
        }
      }
    } catch {
      alert("Login failed")
    }
  }

  return (
  <div className="relative min-h-screen overflow-hidden bg-[#F8FAF7]">

    {/* 🌿 BACKGROUND SHAPES (MATCH LANDING PAGE) */}
    <div className="absolute inset-0">
      <div className="absolute -top-40 -left-40 h-[400px] w-[400px] rounded-full bg-green-200 blur-3xl opacity-40 animate-pulse" />
      <div className="absolute top-1/3 right-0 h-[500px] w-[500px] rounded-full bg-emerald-300 blur-3xl opacity-30 animate-bounce" />
      <div className="absolute bottom-0 left-1/3 h-[300px] w-[300px] rounded-full bg-lime-200 blur-3xl opacity-40 animate-pulse" />
    </div>

    {/* MAIN */}
    <div className="relative mx-auto grid min-h-screen max-w-[1800px] lg:grid-cols-2">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center px-8 py-12 lg:px-24">

        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-white/60 backdrop-blur px-4 py-2 border border-green-100 shadow-sm">
          <Bus size={16} className="text-green-700" />
          <span className="text-sm font-medium text-green-900">
            BusNet Transit System
          </span>
        </div>

        <h1 className="mt-8 text-6xl font-black leading-[0.9] tracking-[-0.06em] md:text-8xl text-green-950">
          Welcome
          <br />
          back.
        </h1>

        <p className="mt-6 max-w-md text-lg text-[#5F7465]">
          Sign in to manage bookings, track routes, and access your digital tickets.
        </p>

        {/* STATS */}
        <div className="mt-12 flex gap-4">

          <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 px-8 py-6 shadow-sm hover:scale-105 transition">
            <div className="text-4xl font-black text-green-900">180+</div>
            <p className="text-sm text-gray-500">Routes</p>
          </div>

          <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 px-8 py-6 shadow-sm hover:scale-105 transition">
            <div className="text-4xl font-black text-green-900">2.3M</div>
            <p className="text-sm text-gray-500">Passengers</p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-8">

        <div className="relative w-full max-w-xl rounded-[40px] bg-white/70 backdrop-blur-xl border border-green-100 p-10 shadow-[0_30px_120px_rgba(34,197,94,0.15)]">

          {/* glow accent */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-300 blur-3xl opacity-40" />

          <h2 className="text-4xl font-black text-green-950">
            Sign In
          </h2>

          <p className="mt-2 text-gray-500">
            Continue to your dashboard
          </p>

          <div className="mt-10 space-y-5">

            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 text-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 text-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            <button
              onClick={handleLogin}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-green-700 px-6 py-5 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Sign In
              <ArrowRight size={18} />
            </button>

          </div>

          <div className="mt-8 text-center">
            <span className="text-gray-500">
              Don't have an account?
            </span>

            <button
              onClick={() => navigate("/register")}
              className="ml-2 font-semibold text-green-700 hover:underline"
            >
              Register
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
)
}

export default Login