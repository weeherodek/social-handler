import { AccountModel } from '@/domain/models/account/account'
import { mockAccountModel, mockAccountModelWithoutAccessToken, mockAuthResponse } from '@/domain/test'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-acount'
import { AddPhoneNumberAccount, AddPhoneNumberAccountParams } from '@/domain/usecases/account/add-phone-number-account'
import { Authentication, AuthResponse, LoginParams } from '@/domain/usecases/account/authentication'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'

export const mockAddAccount = (): AddAccount => {
  class AddAccountStub implements AddAccount {
    async add (account: AddAccountParams): Promise<Omit<AccountModel, 'accessToken'> | null> {
      return mockAccountModelWithoutAccessToken()
    }
  }
  return new AddAccountStub()
}

export const mockAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (authentication: LoginParams): Promise<AuthResponse> {
      return mockAuthResponse()
    }
  }

  return new AuthenticationStub()
}

export const mockLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<AccountModel | null> {
      return await Promise.resolve(mockAccountModel())
    }
  }

  return new LoadAccountByTokenStub()
}

export const mockAddPhoneNumberAccount = (): AddPhoneNumberAccount => {
  class AddPhoneNumberAccountStub implements AddPhoneNumberAccount {
    async addPhoneNumber (data: AddPhoneNumberAccountParams): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddPhoneNumberAccountStub()
}
