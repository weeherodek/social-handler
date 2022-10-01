export interface Authentication {
  auth: (authentication: LoginParams) => Promise<AuthResponse | null>
}

export type AuthResponse = {
  accessToken: string
  name: string
}

export type LoginParams = {
  email: string
  password: string
}
