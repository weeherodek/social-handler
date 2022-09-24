import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { DbAddAccount } from './db-add-account'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'
import { mockAddAccountParams, mockAccountModel } from '@/domain/test'
import { mockHasher } from '@/data/test'
import { mockAddAccountRepository, mockLoadAccountByEmailRepository } from '@/data/test/'

const hashedValue = 'hashed_value'

type SutTypes = {
  sut: AddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositoryStub = mockLoadAccountByEmailRepository()
  jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValue(null)
  const hasherStub = mockHasher()
  const addAccountRepositoryStub = mockAddAccountRepository()
  const sut = new DbAddAccount(hasherStub, addAccountRepositoryStub, loadAccountByEmailRepositoryStub)
  return {
    sut,
    hasherStub,
    addAccountRepositoryStub,
    loadAccountByEmailRepositoryStub
  }
}
describe('DbAddAccount Usecase', () => {
  test('Should call cryptographer with correct password', async () => {
    const { sut, hasherStub } = makeSut()
    const cryptographySpy = jest.spyOn(hasherStub, 'hash')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(cryptographySpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error('Fake Error'))
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = mockAddAccountParams()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: accountData.name,
      email: accountData.email,
      password: hashedValue
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error('Fake Error'))
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return new account on success', async () => {
    const { sut } = makeSut()
    const accountData = mockAddAccountParams()
    const newAccount = await sut.add(accountData)
    expect(newAccount).toEqual({
      id: 'any_id',
      name: accountData.name,
      email: accountData.email,
      password: accountData.password,
      date: new Date()
    })
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail')
    const fakeAccount = mockAddAccountParams()
    await sut.add(fakeAccount)
    expect(loadSpy).toHaveBeenCalledWith(fakeAccount.email)
  })

  test('Should return null if user is found on LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockResolvedValueOnce({ ...mockAccountModel() })
    const account = await sut.add(mockAddAccountParams())
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'loadByEmail').mockRejectedValueOnce(new Error('Fake Error'))
    const accountData = mockAddAccountParams()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
