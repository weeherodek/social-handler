export interface Authentication {
  auth: (email: string, password: string) => Promise<string>
}

export interface AuthResponse {
  accessToken: string
}
