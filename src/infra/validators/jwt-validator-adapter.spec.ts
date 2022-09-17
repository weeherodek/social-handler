import validator from 'validator'
import { JwtValidator } from '@/validation/protocols'
import { JwtValidatorAdapter } from './jwt-validator-adapter'

jest.mock('validator', () => ({
  isJWT (): boolean {
    return true
  }
}))

const makeSut = (): JwtValidator => {
  return new JwtValidatorAdapter()
}

describe('JwtValidator Adapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isJWT').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_token')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('invalid_token')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct token', () => {
    const sut = makeSut()
    const isJwtSpy = jest.spyOn(validator, 'isJWT')
    sut.isValid('any_jwt')
    expect(isJwtSpy).toHaveBeenCalledWith('any_jwt')
  })
})
