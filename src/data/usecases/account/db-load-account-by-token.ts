import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '@/domain/models/account/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string | undefined): Promise<AccountModel | null> {
    const decryptedAcessToken = await this.decrypter.decrypt(accessToken)
    if (decryptedAcessToken) {
      const account = await this.loadAccountByTokenRepository.loadByToken(decryptedAcessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
