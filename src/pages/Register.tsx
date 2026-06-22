// import { useState } from "react"
// import { useNavigate } from "react-router-dom"
// import { register } from "../service/auth"

// const Register = () => {
//   const [name, setName] = useState("")
//   const [email, setEmail] = useState("")
//   const [passsword, setPasssword] = useState("")
//   const [conpasssword, setConPasssword] = useState("")

//   const navigate = useNavigate()

//   const handleRegister = async () => {
//     if (!name || !email || !passsword || !conpasssword) {
//       alert("Please fill all fields..!")
//       return
//     }
//     if (passsword !== conpasssword) {
//       alert("Password not match..!")
//       return
//     }
//     try {
//       const data = await register(name, email, passsword)
//       alert("Success..!")
//       navigate("/login")
//     } catch (err) {
//       alert("Registration fail..!")
//     }
//   }

//   return (
//     <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//       <div className="flex flex-col gap-4 w-80">
//         <input
//           placeholder="name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <input
//           placeholder="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <input
//           placeholder="password"
//           value={passsword}
//           onChange={(e) => setPasssword(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <input
//           placeholder="con-password"
//           value={conpasssword}
//           onChange={(e) => setConPasssword(e.target.value)}
//           className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
//         />
//         <button
//           onClick={handleRegister}
//           className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//         >
//           Register
//         </button>
//         <p className="mt-4 text-gray-700 text-center">
//           <span>Alrady have an account? </span>
//           <button
//             onClick={() => {
//               navigate("/login")
//             }}
//             className="text-blue-600 font-semibold hover:underline"
//           >
//             Login
//           </button>
//         </p>
//       </div>
//     </div>
//   )
// }

// export default Register


import { ArrowRight, Bus, UserPlus } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { register } from "../service/auth"

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const navigate = useNavigate()

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields")
      return
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match")
      return
    }

    try {
      await register(name, email, password)

      alert("Registration successful")
      navigate("/login")
    } catch {
      alert("Registration failed")
    }
  }

  return (
  <div className="relative min-h-screen overflow-hidden bg-[#F8FAF7]">

    {/* 🌿 BACKGROUND SHAPES (MATCH LANDING + LOGIN) */}
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
          Join the
          <br />
          network.
        </h1>

        <p className="mt-6 max-w-lg text-lg text-[#5F7465]">
          Create your account and start booking seats, managing trips, and traveling across the country.
        </p>

        {/* STATS */}
        <div className="mt-12 grid max-w-xl grid-cols-2 gap-4">

          <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-8 shadow-sm hover:scale-105 transition">
            <div className="text-4xl font-black text-green-900">180+</div>
            <p className="mt-2 text-sm text-[#68776B]">Connected Routes</p>
          </div>

          <div className="rounded-[32px] bg-white/70 backdrop-blur border border-green-100 p-8 shadow-sm hover:scale-105 transition">
            <div className="text-4xl font-black text-green-900">2.3M</div>
            <p className="mt-2 text-sm text-[#68776B]">Annual Passengers</p>
          </div>

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center p-8">

        <div className="relative w-full max-w-xl rounded-[40px] bg-white/70 backdrop-blur-xl border border-green-100 p-10 shadow-[0_30px_120px_rgba(34,197,94,0.15)]">

          {/* glow */}
          <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-green-300 blur-3xl opacity-40" />

          <div className="flex items-center gap-3">
            <UserPlus className="text-green-700" />
            <h2 className="text-4xl font-black text-green-950">
              Create Account
            </h2>
          </div>

          <p className="mt-2 text-gray-500">
            Start your journey with BusNet
          </p>

          {/* FORM */}
          <div className="mt-10 space-y-5">

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 text-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            <input
              type="email"
              placeholder="Email Address"
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

            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-2xl border border-green-100 bg-white/60 px-5 py-4 text-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
            />

            <button
              onClick={handleRegister}
              className="mt-4 flex w-full items-center justify-center gap-3 rounded-full bg-green-700 px-6 py-5 font-semibold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Create Account
              <ArrowRight size={18} />
            </button>

          </div>

          {/* FOOTER LINK */}
          <div className="mt-8 text-center">
            <span className="text-gray-500">
              Already have an account?
            </span>

            <button
              onClick={() => navigate("/login")}
              className="ml-2 font-semibold text-green-700 hover:underline"
            >
              Sign In
            </button>
          </div>

        </div>

      </div>
    </div>
  </div>
)
}

export default Register