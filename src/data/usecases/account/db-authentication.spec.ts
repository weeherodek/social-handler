import { HashComparer } from '@/data/protocols/cryptograph/hash-comparer'
import { Encrypter } from '@/data/protocols/cryptograph/encrypter'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { UpdateAcessTokenRepository } from '@/data/protocols/db/account/update-access-token-repository'
import { DbAuthentication } from './db-authentication'
import { mockLoginParams } from '@/domain/test'
import { mockLoadAccountByEmailRepository, mockUpdateAccessTokenRepository, mockHashComparer, mockEncrypter } from '@/data/test/'

type SutTypes = {
  sut: DbAuthentication
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
  hashComparerStub: HashComparer
  encrypterStub: Encrypter
  updateAccessTokenRepositoryStub: UpdateAcessTokenRepository
}

const makeSut = (): SutTypes => {
  const hashComparerStub = mockHashComparer()
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  const encrypterStub = mockEncrypter()
  const updateAccessTokenRepositoryStub = mockUpdateAccessTokenRepository()
  const sut = new DbAuthentication(loadAccountByEmailRepositoryStub, hashComparerStub, encrypterStub, updateAccessTokenRepositoryStub)

  return {
    sut,
    loadAccountByEmailRepositoryStub,
    hashComparerStub,
    encrypterStub,
    updateAccessTokenRepositoryStub
  }
}

describe('Db Authentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const loginModel = mockLoginParams()
    await sut.auth(loginModel)
    expect(loadSpy).toHaveBeenCalledWith(loginModel.email)
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce(null)
    const accessToken = await sut.auth(mockLoginParams())
    expect(accessToken).toBeNull()
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut()
    const compareSpy = jest.spyOn(hashComparerStub, 'compare')
    const fakeLoginModel = mockLoginParams()
    await sut.auth(fakeLoginModel)
    expect(compareSpy).toHaveBeenCalledWith(fakeLoginModel.password, 'any_password')
  })

  test('Should throw if HashComparerStub throws', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut()
    jest.spyOn(hashComparerStub, 'compare').mockResolvedValueOnce(false)
    const authResponse = await sut.auth(mockLoginParams())
    expect(authResponse).toBeNull()
  })

  test('Should call Encrypter with correct id', async () => {
    const { sut, encrypterStub } = makeSut()
    const generateSpy = jest.spyOn(encrypterStub, 'encrypt')
    await sut.auth(mockLoginParams())
    expect(generateSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should throw if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockImplementationOnce(() => {
      throw new Error('Fake Error')
    })
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return a token', async () => {
    const { sut } = makeSut()
    const authResponse = await sut.auth(mockLoginParams())
    expect(authResponse).toEqual({ accessToken: 'encrypted_value', name: 'any_name' })
  })

  test('Should call UpdateAcessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken')
    await sut.auth(mockLoginParams())
    expect(updateSpy).toHaveBeenCalledWith('any_id', 'encrypted_value')
  })

  test('Should throw if UpdateAcessTokenRepository throws', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut()
    jest.spyOn(updateAccessTokenRepositoryStub, 'updateAccessToken').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
