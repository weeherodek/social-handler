export interface UpdateAcessTokenRepository {
  update: (id: string, accessToken: string) => Promise<void>
}
