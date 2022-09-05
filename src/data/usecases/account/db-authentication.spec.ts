import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account/account'
import { LoginModel } from '@/domain/usecases/account/authentication'
import { DbAuthentication } from './db-authentication'

const makeFakeLoginModel = (): LoginModel => ({
  email: 'any_email',
  password: 'any_password'
})

describe('Db Authentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel | null> {
        return {
          id: 'any_id',
          name: 'any_name',
          password: 'any_password',
          email: 'any_email',
          date: new Date()
        }
      }
    }
    const loadAccountByEmailRepositoryStub = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    const loginModel = makeFakeLoginModel()
    await sut.auth(loginModel)
    expect(loadSpy).toHaveBeenCalledWith(loginModel.email)
  })
})
