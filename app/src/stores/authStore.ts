import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  setTokens: (access: string, refresh: string) => void
  clearTokens: () => void
  isAuthenticated: boolean
}

// Store access token in memory only (most secure)
// Store refresh token in localStorage (practical compromise)
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      setTokens: (access: string, refresh: string) => {
        set({
          accessToken: access,
          refreshToken: refresh,
          isAuthenticated: true,
        })
      },
      clearTokens: () => {
        set({
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        })
      },
    }),
    {
      name: 'auth-storage',
      // Only persist refresh token, not access token
      partialize: (state) => ({
        refreshToken: state.refreshToken,
      }),
    }
  )
)

