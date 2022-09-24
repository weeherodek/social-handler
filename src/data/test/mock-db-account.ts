import { AccountModel } from '@/domain/models/account/account'
import { mockAccountModel, mockAccountModelWithoutAccessToken } from '@/domain/test'
import { AddAccountParams } from '@/domain/usecases/account/add-acount'
import { AddAccountRepository } from '../protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '../protocols/db/account/load-account-by-token-repository'
import { UpdateAcessTokenRepository } from '../protocols/db/account/update-access-token-repository'

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel | null> {
      return mockAccountModel()
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountParams): Promise<Omit<AccountModel, 'accessToken'>> {
      return mockAccountModelWithoutAccessToken()
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAcessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAcessTokenRepository {
    async updateAccessToken (id: string, accessToken: string): Promise<void> {}
  }
  return new UpdateAccessTokenRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}
