import { create } from 'zustand'

interface AuthState {
  accessToken: string | null
  refreshToken: string | null
  setTokens: (access: string, refresh: string) => void
  clearTokens: () => void
  isAuthenticated: boolean
  isRefreshing: boolean
  setIsRefreshing: (isRefreshing: boolean) => void
}

// Store access token in memory only (most secure - lost on refresh)
// Store refresh token in sessionStorage (more secure than localStorage, cleared on tab close)
const REFRESH_TOKEN_KEY = 'jobai_refresh_token'

export const useAuthStore = create<AuthState>()((set) => ({
  accessToken: null,
  refreshToken: (() => {
    // Initialize from sessionStorage on store creation
    try {
      return sessionStorage.getItem(REFRESH_TOKEN_KEY)
    } catch {
      return null
    }
  })(),
  isAuthenticated: false,
  isRefreshing: false,
  setIsRefreshing: (isRefreshing: boolean) => {
    set({ isRefreshing })
  },
  setTokens: (access: string, refresh: string) => {
    // Store refresh token in sessionStorage
    try {
      sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh)
    } catch (error) {
      console.error('Failed to store refresh token:', error)
    }
    
    set({
      accessToken: access,
      refreshToken: refresh,
      isAuthenticated: true,
      isRefreshing: false,
    })
  },
  clearTokens: () => {
    // Remove from sessionStorage
    try {
      sessionStorage.removeItem(REFRESH_TOKEN_KEY)
    } catch (error) {
      console.error('Failed to clear refresh token:', error)
    }
    
    set({
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isRefreshing: false,
    })
  },
}))

