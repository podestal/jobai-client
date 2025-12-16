import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { useQueryClient } from '@tanstack/react-query'

interface PrivateRoutesProps {
  children: ReactNode
}

const PrivateRoutes = ({ children }: PrivateRoutesProps) => {
  const accessToken = useAuthStore((state) => state.accessToken)
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const isRefreshing = useAuthStore((state) => state.isRefreshing)
  const queryClient = useQueryClient()
  const [hasCheckedRefresh, setHasCheckedRefresh] = useState(false)

  // Check if refresh query is in progress
  const refreshQuery = queryClient.getQueryState(['refreshToken'])

  useEffect(() => {
    // Give a small delay to allow refresh to start if refreshToken exists
    if (refreshToken && !accessToken && !hasCheckedRefresh) {
      const timer = setTimeout(() => {
        setHasCheckedRefresh(true)
      }, 100)
      return () => clearTimeout(timer)
    } else if (accessToken || !refreshToken) {
      setHasCheckedRefresh(true)
    }
  }, [refreshToken, accessToken, hasCheckedRefresh])

  // Show loading if:
  // 1. We're actively refreshing
  // 2. We have refreshToken but no accessToken and refresh query is pending/fetching
  // 3. We haven't finished checking yet
  const shouldWaitForRefresh = 
    isRefreshing || 
    (refreshToken && !accessToken && (refreshQuery?.status === 'pending' || refreshQuery?.fetchStatus === 'fetching')) ||
    (refreshToken && !accessToken && !hasCheckedRefresh)

  if (shouldWaitForRefresh) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  // Check if user has access token (most reliable check)
  if (!accessToken || !isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}

export default PrivateRoutes