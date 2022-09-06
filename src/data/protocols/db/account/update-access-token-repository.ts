export interface UpdateAcessTokenRepository {
  updateAccessToken: (id: string, accessToken: string) => Promise<void>
}
