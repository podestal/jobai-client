import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'

interface PrivateRoutesProps {
  children: ReactNode
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  // Check if user has access token (most reliable check)
  if (!accessToken || !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoutes