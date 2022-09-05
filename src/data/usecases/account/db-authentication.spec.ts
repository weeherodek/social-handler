import { LoadAccountByEmailRepository } from '@/data/protocols/load-account-by-email-repository'
import { AccountModel } from '@/domain/models/account/account'
import { LoginModel } from '@/domain/usecases/account/authentication'
import { DbAuthentication } from './db-authentication'

const makeFakeLoginModel = (): LoginModel => ({
  email: 'any_email',
  password: 'any_password'
})

const makeLoadAccountByRepository = (): LoadAccountByEmailRepository => {
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

  return new LoadAccountByEmailRepositoryStub()
}

interface sutTypes {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): sutTypes => {
  const loadAccountByEmailRepositoryStub = makeLoadAccountByRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub
  }
}

describe('Db Authentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    const loginModel = makeFakeLoginModel()
    await sut.auth(loginModel)
    expect(loadSpy).toHaveBeenCalledWith(loginModel.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.auth(makeFakeLoginModel())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
