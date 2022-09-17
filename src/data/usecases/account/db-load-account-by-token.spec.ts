import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/account/load-account-by-token-repository'
import { AccountModel } from '@/domain/models/account/account'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  date: new Date()
})

const makeLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (accessToken: string, role?: string): Promise<AccountModel | null> {
      return await Promise.resolve(makeFakeAccountModel())
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (accessToken: string): Promise<string | null> {
      return await Promise.resolve('decrypted_token')
    }
  }
  return new DecrypterStub()
}

interface sutTypes {
  loadAccountByTokenRepositoryStub: LoadAccountByTokenRepository
  decrypterStub: Decrypter
  sut: DbLoadAccountByToken
}

const makeSut = (): sutTypes => {
  const loadAccountByTokenRepositoryStub = makeLoadAccountByTokenRepository()
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub, loadAccountByTokenRepositoryStub)
  return {
    sut,
    decrypterStub,
    loadAccountByTokenRepositoryStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const spyDecrypt = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token', 'any_role')
    expect(spyDecrypt).toHaveBeenCalledWith('any_token')
  })

  test('Should return null if Decrypter returns null', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should call LoadAccountByTokenRepository with correct values', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    const spyLoadByToken = jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken')
    await sut.load('any_token', 'any_role')
    expect(spyLoadByToken).toHaveBeenCalledWith('decrypted_token', 'any_role')
  })

  test('Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockResolvedValueOnce(null)
    const account = await sut.load('any_token', 'any_role')
    expect(account).toBeNull()
  })

  test('Should an account if LoadAccountByTokenRepository returns a account', async () => {
    const { sut } = makeSut()
    const account = await sut.load('any_token', 'any_role')
    expect(account).toEqual(makeFakeAccountModel())
  })

  test('Should throw if Decrypter throws', async () => {
    const { sut, decrypterStub } = makeSut()
    jest.spyOn(decrypterStub, 'decrypt').mockImplementationOnce(async () => await Promise.reject(new Error('Fake Error')))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByTokenRepositoryStub, 'loadByToken').mockImplementationOnce(async () => await Promise.reject(new Error('Fake Error')))
    const promise = sut.load('any_token', 'any_role')
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
