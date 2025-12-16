import AuthClient from "./authClient"

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    access: string
    refresh: string
}

const loginService = new AuthClient<LoginResponse, LoginRequest>("jwt/create/")

export default loginService