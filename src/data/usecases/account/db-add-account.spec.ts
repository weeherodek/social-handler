import { AddAccountRepository } from '@/data/protocols/db/account/add-account-repository'
import { Cryptograph } from '@/data/protocols/cryptograph/cryptographer'
import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { DbAddAccount } from './db-add-account'

jest.useFakeTimers({
  now: new Date('2020-01-01')
})

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeCryptoStub = (): Cryptograph => {
  class CryptographStub implements Cryptograph {
    async crypto (value: string): Promise<string> {
      return 'value_crypto'
    }
  }
  return new CryptographStub()
}

const makeAddAccountRepositoryStub = (): AddAccountRepository => {
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
  cryptographStub: Cryptograph
  addAccountRepositoryStub: AddAccountRepository
}

const makeSut = (): sutTypes => {
  const cryptographStub = makeCryptoStub()
  const addAccountRepositoryStub = makeAddAccountRepositoryStub()
  const sut = new DbAddAccount(cryptographStub, addAccountRepositoryStub)
  return {
    sut,
    cryptographStub,
    addAccountRepositoryStub
  }
}
describe('DbAddAccount Usecase', () => {
  test('Should call cryptographer with correct password', async () => {
    const { sut, cryptographStub } = makeSut()
    const cryptographySpy = jest.spyOn(cryptographStub, 'crypto')
    const accountData = makeFakeAccount()
    await sut.add(accountData)
    expect(cryptographySpy).toHaveBeenCalledWith(accountData.password)
  })

  test('Should throw if Cryptographer throws', async () => {
    const { sut, cryptographStub } = makeSut()
    jest.spyOn(cryptographStub, 'crypto').mockRejectedValueOnce(new Error('Fake Error'))
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
})
