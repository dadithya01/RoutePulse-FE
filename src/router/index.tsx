import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { lazy, Suspense, type ReactNode } from "react"
import { useAuth } from "../hooks/useAuth"
import AdminDashboard from "../pages/AdminDashboard"
import DriverDashboard from "../pages/DriverDashboard"
import UserDashboard from "../pages/UserDashboard"
import LandingPage from "../pages/LandingPage"
import DriverRegister from "../pages/DriverRegister"

const Login = lazy(() => import("./../pages/Login"))
const Register = lazy(() => import("./../pages/Register"))
const BookTripPage = lazy(() => import("./../pages/BookTripPage"))

type RequreAuthTypes = {
    children: ReactNode
    roles?: string[]
}

const RequreAuth = ({ children, roles }: RequreAuthTypes) => {
    const { user, loading } = useAuth()

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-[#F7FAF7]">
                <div className="h-14 w-14 rounded-full border-4 border-green-200 border-t-green-700 animate-spin" />
            </div>
        )
    }

    if (!user) {
        return <Navigate to={"/"} replace />
    }

    if (roles && !roles.some((role) => user?.roles.includes(role))) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[#F7FAF7] gap-4">
                <div className="rounded-[32px] bg-white/70 backdrop-blur border border-red-100 p-10 text-center shadow-lg">
                    <h2 className="text-2xl font-black text-red-600 mb-2">Access Denied</h2>
                    <p className="text-gray-500">You do not have permission to view this page.</p>
                </div>
            </div>
        )
    }

    return <>{children}</>
}

const Router = () => {
    return (
        <BrowserRouter>
            <Suspense
                fallback={
                    <div className="flex items-center justify-center h-screen bg-[#F7FAF7]">
                        <div className="h-14 w-14 rounded-full border-4 border-green-200 border-t-green-700 animate-spin" />
                    </div>
                }
            >
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/register-driver" element={<DriverRegister />} />

                    {/* User routes */}
                    <Route
                        path="/user-dashboard"
                        element={
                            <RequreAuth roles={["USER"]}>
                                <UserDashboard />
                            </RequreAuth>
                        }
                    />
                    <Route
                        path="/book-trip"
                        element={
                            <RequreAuth roles={["USER"]}>
                                <BookTripPage />
                            </RequreAuth>
                        }
                    />

                    {/* Admin routes */}
                    <Route
                        path="/admin-dashboard"
                        element={
                            <RequreAuth roles={["ADMIN"]}>
                                <AdminDashboard />
                            </RequreAuth>
                        }
                    />

                    {/* Driver routes */}
                    <Route
                        path="/driver-dashboard"
                        element={
                            <RequreAuth roles={["DRIVER"]}>
                                <DriverDashboard />
                            </RequreAuth>
                        }
                    />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router