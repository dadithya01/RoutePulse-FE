import { Bus, LogOut, LayoutDashboard } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth"

interface NavbarProps {
  title: string
}

const Navbar = ({ title }: NavbarProps) => {
  const { user, setUser } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    setUser(null)
    navigate("/")
  }

  const getRoleBadge = () => {
    if (!user?.roles) return null
    const role = user.roles[0]
    const colors: Record<string, string> = {
      ADMIN: "bg-purple-100 text-purple-700",
      DRIVER: "bg-blue-100 text-blue-700",
      USER: "bg-green-100 text-green-700",
    }
    return (
      <span className={`rounded-full px-3 py-1 text-xs font-bold ${colors[role] ?? "bg-gray-100 text-gray-700"}`}>
        {role}
      </span>
    )
  }

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/60 border-b border-green-100 shadow-sm">
      <div className="mx-auto max-w-[1800px] flex items-center justify-between px-6 py-4">
        {/* Left: Logo + title */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-green-600 to-emerald-400 flex items-center justify-center shadow-md">
            <Bus className="text-white" size={16} />
          </div>
          <div>
            <span className="font-black text-green-900 text-lg">RoutePulse</span>
            <span className="ml-3 text-gray-400 text-sm hidden sm:inline">/ {title}</span>
          </div>
        </div>

        {/* Right: user info + logout */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2">
            <LayoutDashboard size={14} className="text-gray-400" />
            <span className="text-sm text-gray-600 font-medium">{user?.email}</span>
            {getRoleBadge()}
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 rounded-full bg-green-50 border border-green-100 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-100 hover:scale-105 transition"
          >
            <LogOut size={14} />
            Logout
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
