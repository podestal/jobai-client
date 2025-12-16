import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import loginService from '../../services/auth/loginService'
import type { LoginRequest } from '../../services/auth/loginService'
import { useAuthStore } from '../../stores/authStore'

interface UseLoginOptions {
  onSuccess?: () => void
  onError?: (error: Error) => void
}

const useLogin = (options?: UseLoginOptions) => {
  const setTokens = useAuthStore((state) => state.setTokens)
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await loginService.post(credentials)
      return response
    },
    onSuccess: (data) => {
      // Store tokens in Zustand store
      setTokens(data.access, data.refresh)
      
      // Call custom success handler if provided
      options?.onSuccess?.()
      
      // Default: redirect to onboarding
      navigate('/onboarding')
    },
    onError: (error: Error) => {
      // Call custom error handler if provided
      options?.onError?.(error)
      console.error(error)
    },
  })
}

export default useLogin
