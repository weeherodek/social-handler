export interface Authentication {
  auth: (authentication: LoginModel) => Promise<string | null>
}

export type AuthResponse = {
  accessToken: string
}

export type LoginModel = {
  email: string
  password: string
}
