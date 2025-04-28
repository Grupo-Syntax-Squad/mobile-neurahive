import { useAuth } from "@/contexts/authContext"

const WithRole = ({ children, allowedRoles }: { children: any; allowedRoles: number[] }) => {
    const { user } = useAuth()

    if (allowedRoles.length === 0) {
        return children
    }

    if (user && allowedRoles.some((role) => user.roles.includes(role))) {
        return children
    }
    return <></>
}

export default WithRole
