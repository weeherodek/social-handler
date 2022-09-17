import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

const makeDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (accessToken: string): Promise<string> {
      return await Promise.resolve('any_id')
    }
  }
  return new DecrypterStub()
}

interface sutTypes {
  decrypterStub: Decrypter
  sut: DbLoadAccountByToken
}

const makeSut = (): sutTypes => {
  const decrypterStub = makeDecrypter()
  const sut = new DbLoadAccountByToken(decrypterStub)
  return {
    sut,
    decrypterStub
  }
}

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    const { sut, decrypterStub } = makeSut()
    const spyDecrypt = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(spyDecrypt).toHaveBeenCalledWith('any_token')
  })
})
