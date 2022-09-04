export interface Authentication {
  auth: (email: string, password: string) => Promise<string | null>
}

export interface AuthResponse {
  accessToken: string
}
