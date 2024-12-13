import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import api from "@/lib/api"
import { User } from "@prisma/client"

export function useAuth() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<User | null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            api.get("/auth/me")
                .then((response) => {
                    setIsAuthenticated(true)
                    setUser(response.data.user)
                })
                .catch(() => {
                    localStorage.removeItem("token")
                    setIsAuthenticated(false)
                    setUser(null)
                })
        }
    }, [])

    const login = async (email: string, password: string) => {
        try {
            const response = await api.post("/auth/login", { email, password })
            localStorage.setItem("token", response.data.token)
            setIsAuthenticated(true)
            setUser(response.data.user)
            router.push("/dashboard")
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        setUser(null)
        router.push("/")
    }

    return { isAuthenticated, user, login, logout }
}
