export interface Authentication {
  auth: (authentication: LoginParams) => Promise<string | null>
}

export type AuthResponse = {
  accessToken: string
}

export type LoginParams = {
  email: string
  password: string
}
