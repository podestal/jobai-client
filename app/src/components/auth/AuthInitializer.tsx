import useRefreshToken from '../../hooks/auth/useRefreshToken'

/**
 * Component that initializes authentication state on app load
 * Automatically refreshes access token if refresh token exists
 */
const AuthInitializer = () => {
  useRefreshToken()
  return null
}

export default AuthInitializer

