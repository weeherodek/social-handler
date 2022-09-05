import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { Authentication, LoginModel } from '@/domain/usecases/account/authentication'

export class DbAuthentication implements Authentication {
  constructor (private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository) {
  }

  async auth (authentication: LoginModel): Promise<string | null> {
    await this.loadAccountByEmailRepository.load(authentication.email)
    return null
  }
}
