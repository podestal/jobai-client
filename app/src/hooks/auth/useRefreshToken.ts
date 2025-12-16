import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import refreshService from '../../services/auth/refreshService'
import { useAuthStore } from '../../stores/authStore'

/**
 * Hook to automatically refresh access token on app load if refresh token exists
 * This restores authentication state after page refresh
 */
const useRefreshToken = () => {
  const refreshToken = useAuthStore((state) => state.refreshToken)
  const accessToken = useAuthStore((state) => state.accessToken)
  const setTokens = useAuthStore((state) => state.setTokens)
  const clearTokens = useAuthStore((state) => state.clearTokens)
  const setIsRefreshing = useAuthStore((state) => state.setIsRefreshing)

  const { data, isError, isLoading } = useQuery({
    queryKey: ['refreshToken'],
    queryFn: async () => {
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      const response = await refreshService.post({ refresh: refreshToken })
      return response
    },
    enabled: !!refreshToken && !accessToken, // Only run if refresh token exists and no access token
    retry: false,
    staleTime: Infinity, // Don't refetch automatically
  })

  // Update refreshing state
  useEffect(() => {
    setIsRefreshing(isLoading)
  }, [isLoading, setIsRefreshing])

  useEffect(() => {
    if (data?.access && refreshToken) {
      // Successfully refreshed - update tokens
      setTokens(data.access, refreshToken)
    }
  }, [data, refreshToken, setTokens])

  useEffect(() => {
    if (isError) {
      // Refresh failed - clear tokens and user needs to login again
      clearTokens()
    }
  }, [isError, clearTokens])

  return {
    isRefreshing: isLoading,
    isRefreshed: !!data?.access,
  }
}

export default useRefreshToken

