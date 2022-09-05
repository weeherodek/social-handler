import { HashComparer } from '@/data/protocols/cryptograph/hash-comparer'
import { TokenGenerator } from '@/data/protocols/cryptograph/token-generator'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAcessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { Authentication, LoginModel } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAcessTokenRepository
  ) {
  }

  async auth (authentication: LoginModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const acessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepository.update(account.id, acessToken)
        return acessToken
      }
    }
    return null
  }
}
