import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_token'
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JWT Adapter', () => {
  test('Should call sign with correct values', () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should return a token on success', () => {
    const sut = makeSut()
    const token = sut.encrypt('any_value')
    expect(token).toBe('any_token')
  })

  test('Should throw if jwt throws', () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error('Fake Error')
    })
    expect(() => sut.encrypt('any_value')).toThrow(new Error('Fake Error'))
  })
})
