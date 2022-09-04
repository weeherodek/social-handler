export interface Authentication {
  auth: (authentication: LoginModel) => Promise<string | null>
}

export interface AuthResponse {
  accessToken: string
}

export interface LoginModel {
  email: string
  password: string
}
