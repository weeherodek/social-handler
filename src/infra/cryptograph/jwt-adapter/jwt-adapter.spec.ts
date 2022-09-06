import jwt from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => ({
  sign: () => 'any_token'
}))

describe('JWT Adapter', () => {
  test('Should call sign with correct values', () => {
    const sut = new JwtAdapter('secret')
    const signSpy = jest.spyOn(jwt, 'sign')
    sut.encrypt('any_value')
    expect(signSpy).toHaveBeenCalledWith({ id: 'any_value' }, 'secret')
  })

  test('Should return a token on success', () => {
    const sut = new JwtAdapter('secret')
    const token = sut.encrypt('any_value')
    expect(token).toBe('any_token')
  })
})
