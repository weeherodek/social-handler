import { Decrypter } from '@/data/protocols/cryptograph/decrypter'
import { DbLoadAccountByToken } from './db-load-account-by-token'

describe('DbLoadAccountByToken Usecase', () => {
  test('Should call Decrypter with correct values', async () => {
    class DecrypterStub implements Decrypter {
      async decrypt (accessToken: string): Promise<string> {
        return await Promise.resolve('any_id')
      }
    }
    const decrypterStub = new DecrypterStub()
    const sut = new DbLoadAccountByToken(decrypterStub)
    const spyDecrypt = jest.spyOn(decrypterStub, 'decrypt')
    await sut.load('any_token')
    expect(spyDecrypt).toHaveBeenCalledWith('any_token')
  })
})
