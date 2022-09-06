
import { Hasher } from '@/data/protocols/cryptograph/hasher'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async () => 'hashed_value'
}))

const salt = 12

const makeSut = (): Hasher => {
  const sut = new BcryptAdapter(salt)
  return sut
}

describe('Bcrypt adapter', () => {
  test('Should call bcrypt with correct params', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return hashed value', async () => {
    const sut = makeSut()
    const hashedValue = await sut.hash('any_value')
    expect(hashedValue).toBe('hashed_value')
  })

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(async () => await Promise.reject(new Error())
    )
    const promise = sut.hash('any_value')
    await expect(promise).rejects.toThrow()
  })
})
