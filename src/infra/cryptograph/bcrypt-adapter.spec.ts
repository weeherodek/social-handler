import { Cryptograph } from '@/data/protocols/cryptographer'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async () => 'hashed_value'
}))

const makeSut = (): Cryptograph => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return sut
}

describe('Bcrypt adapter', () => {
  test('Should call bcrypt with correct params', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.crypto('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', 12)
  })

  test('Should return hashed value', async () => {
    const sut = makeSut()
    const hashedValue = await sut.crypto('any_value')
    expect(hashedValue).toBe('hashed_value')
  })
})
