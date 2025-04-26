import React, { useEffect } from "react"
import { useAuth } from "../context/authContext"
import { useRouter } from "expo-router"

interface ProtectedRouteProps {
    allowedRoles: number[]
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles, children }) => {
    const router = useRouter()
    const { user, isAuthenticated } = useAuth()

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/Auth/login")
            return
        }

        if (
            !user ||
            (allowedRoles.length !== 0 && !allowedRoles.some((role) => user.roles.includes(role)))
        ) {
            router.replace("/+not-found")
        }
    }, [isAuthenticated, user, allowedRoles, router])

    if (
        !isAuthenticated ||
        !user ||
        (allowedRoles.length !== 0 && !allowedRoles.some((role) => user.roles.includes(role)))
    ) {
        return null
    }

    return <>{children}</>
}

export default ProtectedRoute
