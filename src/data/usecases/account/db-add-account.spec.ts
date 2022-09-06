import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { DbAddAccount } from './db-add-account'
import { LoadAccountByEmailRepository } from '@/data/protocols/db/account/load-account-by-email-repository'

jest.useFakeTimers({
  now: new Date('2020-01-01')
})

const makeFakeAccountModel = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  date: new Date()
})

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async load (email: string): Promise<AccountModel | null> {
      return null
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

const makeHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return 'value_crypto'
    }
  }
  return new HasherStub()
}

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (account: AddAccountModel): Promise<AccountModel> {
      return {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'value_crypto',
        date: new Date()
      }
    }
  }
  return new AddAccountRepositoryStub()
}

interface sutTypes {
  sut: AddAccount
  hasherStub: Hasher
  addAccountRepositoryStub: AddAccountRepository
  loadAccountByEmailRepositoryStub: LoadAccountByEmailRepository
}

const makeSut = (): sutTypes => {
  const hasherStub = makeHasher()
  const addAccountRepositoryStub = makeAddAccountRepository()
  const loadAccountByEmailRepositoryStub = makeLoadAccountByEmailRepository()
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
    const accountData = makeFakeAccount()
    await sut.add(accountData)
    expect(cryptographySpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherStub } = makeSut()
    jest.spyOn(hasherStub, 'hash').mockRejectedValueOnce(new Error('Fake Error'))
    const accountData = makeFakeAccount()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should call AddAccountRepository with correct values', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = makeFakeAccount()
    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'any_name',
      email: 'any_email',
      password: 'value_crypto'
    })
  })

  test('Should throw if AddAccountRepository throws', async () => {
    const { sut, addAccountRepositoryStub } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockRejectedValueOnce(new Error('Fake Error'))
    const accountData = makeFakeAccount()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return new account on success', async () => {
    const { sut } = makeSut()
    const accountData = makeFakeAccount()
    const newAccount = await sut.add(accountData)
    expect(newAccount).toEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'value_crypto',
      date: new Date()
    })
  })

  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load')
    const fakeAccount = makeFakeAccount()
    await sut.add(fakeAccount)
    expect(loadSpy).toHaveBeenCalledWith(fakeAccount.email)
  })

  test('Should return null if user is found on LoadAccountByEmailRepository', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockResolvedValueOnce(makeFakeAccountModel())
    const account = await sut.add(makeFakeAccount())
    expect(account).toBeNull()
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadAccountByEmailRepositoryStub, 'load').mockRejectedValueOnce(new Error('Fake Error'))
    const accountData = makeFakeAccount()
    const promise = sut.add(accountData)
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
