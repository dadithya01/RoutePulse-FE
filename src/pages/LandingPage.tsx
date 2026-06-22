

import { motion } from "framer-motion"
import {
  Bus,
  MapPinned,
  Ticket,
  ShieldCheck,
  Clock3,
  Route,
} from "lucide-react"
import '../App/App.css'
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F3FBF5] text-[#0F1A12]">

      {/* 🌿 BACKGROUND LAYERS */}
      <div className="absolute inset-0 overflow-hidden">

        {/* Soft gradient base */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#E8F7EC,transparent_55%),radial-gradient(circle_at_bottom,#DDF3E3,transparent_60%)]" />

        {/* BIG GREEN BLOBS */}
        <div className="absolute -top-40 -left-40 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-green-300 via-emerald-400 to-lime-300 blur-3xl opacity-40 animate-pulse" />

        <div className="absolute top-20 -right-60 h-[700px] w-[700px] rounded-full bg-gradient-to-br from-emerald-400 via-green-500 to-lime-200 blur-3xl opacity-30 animate-bounce" />

        <div className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full bg-green-300 blur-[120px] opacity-30 animate-pulse" />

        {/* FLOATING RINGS */}
        <div className="absolute top-1/3 left-10 h-[320px] w-[320px] rounded-full border border-green-300/40 animate-spin-slow" />
        <div className="absolute bottom-10 right-10 h-[420px] w-[420px] rounded-full border border-emerald-300/30 animate-pulse" />

        {/* SMALL PARTICLES */}
        <div className="absolute top-1/4 left-1/4 h-3 w-3 rounded-full bg-green-500 animate-ping opacity-60" />
        <div className="absolute top-2/3 right-1/3 h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
        <div className="absolute bottom-1/3 left-1/2 h-2 w-2 rounded-full bg-lime-500 animate-bounce" />

      </div>

      {/* MAIN CONTENT */}
      <main className="relative mx-auto max-w-[1800px] px-6 lg:px-16">

        {/* HEADER */}
        <header className="fixed top-6 left-0 w-full z-50 flex justify-center">

  <div className="flex items-center gap-10 rounded-full border border-green-100 bg-white/60 backdrop-blur-xl px-8 py-3 shadow-[0_10px_40px_rgba(34,197,94,0.15)]">

    {/* LOGO */}
    <div className="flex items-center gap-2 pr-4 border-r border-green-100">
      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-400 flex items-center justify-center shadow-md">
        <Bus className="text-white" size={16} />
      </div>

      <span className="font-black tracking-tight text-green-900">
        <a href="/">BUSNET</a>
      </span>
    </div>

    {/* LINKS */}
    <nav className="flex items-center gap-8 text-sm font-medium text-[#355243]">

      <a
        href="#features"
        className="hover:text-green-700 transition"
      >
        Features
      </a>

    </nav>

    {/* ACTION */}
    <div className="pl-4 border-l border-green-100 flex items-center gap-3">

      <a
        href="/login"
        className="rounded-full bg-green-700 px-5 py-2 text-sm font-semibold text-white shadow-md hover:scale-105 transition"
      >
        Login
      </a>

    </div>

  </div>
</header>

        {/* HERO */}
        <section className="grid lg:grid-cols-[1.3fr_0.7fr] gap-12 py-20">

          {/* LEFT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <div className="inline-flex items-center gap-2 rounded-full bg-white/60 backdrop-blur px-5 py-2 shadow-sm border border-green-100">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Live Transit Network
            </div>

            <h1 className="mt-8 text-7xl md:text-8xl xl:text-[9rem] font-black leading-[0.82] tracking-[-0.06em] text-green-950">
              Travel
              <br />
              smarter
              <br />
              every day.
            </h1>

            <p className="mt-8 max-w-xl text-lg text-[#3E5A43]">
              Smart routing, live tracking, and digital ticketing built for a modern transport ecosystem.
            </p>

            {/* CTA */}
            <div className="mt-10 flex gap-4">

              <Link
                to="/register"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 px-8 py-5 text-white font-semibold shadow-lg hover:scale-105 transition"
              >
                Book Ticket <Ticket size={18} />
              </Link>

              <Link
                to="/register-driver"
                className="rounded-full border border-green-200 bg-white/60 backdrop-blur px-8 py-5 font-semibold hover:bg-green-50 transition hover:scale-105"
              >
                Become Driver
              </Link>

            </div>
          </motion.div>

          
        </section>

        {/* FEATURES */}
        <section id="features" className="py-24">

          <h2 className="text-5xl font-black text-green-950">
            Built for modern transport systems.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              { icon: MapPinned, title: "Smart Routing" },
              { icon: Ticket, title: "Digital Tickets" },
              { icon: ShieldCheck, title: "Verified Drivers" },
              { icon: Clock3, title: "Live Tracking" },
              { icon: Route, title: "Nationwide Network" },
              { icon: Bus, title: "Fleet Management" },
            ].map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -8, scale: 1.03 }}
                className="rounded-[40px] bg-white/70 backdrop-blur-md border border-green-100 p-8 shadow-lg hover:shadow-green-200 transition"
              >
                <f.icon className="text-green-700" />
                <h3 className="mt-4 text-xl font-bold">{f.title}</h3>
                <p className="text-sm text-gray-600 mt-2">
                  Intelligent, real-time transport optimization system.
                </p>
              </motion.div>
            ))}

          </div>
        </section>

        {/* CTA */}
        <section className="py-28 text-center">

          <motion.div
            whileInView={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            className="rounded-[48px] bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 text-white p-16 shadow-2xl"
          >
            <h2 className="text-5xl font-black">
              Ready to travel smarter?
            </h2>

            <p className="mt-4 opacity-80">
              Join the next-generation transit ecosystem today.
            </p>

            <div className="mt-10 flex justify-center">
              <Link
                to="/register"
                className="rounded-full bg-white text-green-700 px-10 py-5 font-bold hover:scale-105 transition"
              >
                Get Started
              </Link>
            </div>

          </motion.div>

        </section>

      </main>
    </div>
  )
}