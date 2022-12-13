import { ReactNode, useContext } from "react"
import { AuthContext } from "utils"

interface Props {
    children: ReactNode
    staffOnly?: boolean
    adminOnly?: boolean
    requiredRole?: string[] | string
}
export const ProtectedContent = ({ requiredRole, staffOnly, adminOnly, children }: Props) => {
    const { user: { role: { name, isStaff } } } = useContext(AuthContext)

    const authorize = (role: string) => {
        if (staffOnly && isStaff)
            return true

        if (adminOnly && name === 'admin')
            return true

        if (requiredRole)
            if (Array.isArray(requiredRole))
                return requiredRole.includes(role)
        return requiredRole === role
    }

    if (authorize(name))
        return <>{children}</>

    return null
}