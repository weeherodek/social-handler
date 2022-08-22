import { Cryptograph } from '@/data/protocols/cryptographer'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { DbAddAccount } from './db-add-account'

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email',
  password: 'any_password'
})

const makeCryptoStub = (): Cryptograph => {
  class CryptographStub {
    async crypto (value: string): Promise<string> {
      return 'value_crypto'
    }
  }
  return new CryptographStub()
}

interface sutTypes {
  sut: AddAccount
  cryptographStub: Cryptograph
}

const makeSut = (): sutTypes => {
  const cryptographStub = makeCryptoStub()
  const sut = new DbAddAccount(cryptographStub)
  return {
    sut,
    cryptographStub
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
})
