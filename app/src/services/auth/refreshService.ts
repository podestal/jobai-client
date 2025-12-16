import AuthClient from "./authClient"

export interface RefreshRequest {
  refresh: string
}

export interface RefreshResponse {
  access: string
}

const refreshService = new AuthClient<RefreshResponse, RefreshRequest>("jwt/refresh/")

export default refreshService

