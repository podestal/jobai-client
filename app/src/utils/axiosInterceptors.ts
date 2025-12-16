import axios from 'axios'
import { useAuthStore } from '../stores/authStore'

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value?: any) => void
  reject: (error?: any) => void
}> = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  
  failedQueue = []
}

export const setupAxiosInterceptors = (instance: ReturnType<typeof axios.create>) => {
  if (!instance) {
    console.error('Axios instance not provided')
    return
  }

  // Request interceptor: Add access token to all requests (except refresh endpoint)
  instance.interceptors.request.use(
    (config) => {
      // Don't add Authorization header for refresh endpoint
      if (config.url?.includes('jwt/refresh/')) {
        return config
      }
      
      const accessToken = useAuthStore.getState().accessToken
      if (accessToken) {
        config.headers.Authorization = `JWT ${accessToken}`
      }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor: Handle 401 errors and refresh token
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config

      // If error is 401 and we haven't already tried to refresh
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If already refreshing, queue this request
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject })
          })
            .then((token) => {
              originalRequest.headers.Authorization = `JWT ${token}`
              return instance(originalRequest)
            })
            .catch((err) => {
              return Promise.reject(err)
            })
        }

        originalRequest._retry = true
        isRefreshing = true

        try {
          const refreshToken = useAuthStore.getState().refreshToken
          
          if (!refreshToken) {
            throw new Error('No refresh token available')
          }

          // Attempt to refresh the token (use axios directly to avoid circular dependency)
          const response = await instance.post<{ access: string }>('jwt/refresh/', {
            refresh: refreshToken
          })
          const newAccessToken = response.data.access

          // Update tokens in store
          const { setTokens } = useAuthStore.getState()
          setTokens(newAccessToken, refreshToken)

          // Process queued requests
          processQueue(null, newAccessToken)

          // Retry original request with new token
          originalRequest.headers.Authorization = `JWT ${newAccessToken}`
          return instance(originalRequest)
        } catch (refreshError) {
          // Refresh failed - clear tokens and redirect to login
          processQueue(refreshError, null)
          const { clearTokens } = useAuthStore.getState()
          clearTokens()
          
          // Redirect to login if we're in the browser
          if (typeof window !== 'undefined') {
            window.location.href = '/login'
          }
          
          return Promise.reject(refreshError)
        } finally {
          isRefreshing = false
        }
      }

      return Promise.reject(error)
    }
  )
}

