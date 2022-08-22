import { Cryptograph } from '@/data/protocols/cryptographer'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { DbAddAccount } from './db-add-account'

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
    const accountData = {
      name: 'any_name',
      email: 'any_email',
      password: 'any_password'
    }
    await sut.add(accountData)
    expect(cryptographySpy).toHaveBeenCalledWith(accountData.password)
  })
})
