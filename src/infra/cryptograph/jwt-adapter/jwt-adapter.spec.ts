import jwt, { JwtPayload } from 'jsonwebtoken'
import { JwtAdapter } from './jwt-adapter'

jest.mock('jsonwebtoken', () => {
  const payload: JwtPayload = {
    id: 'decrypted_token'
  }
  return {
    sign: () => 'any_token',
    verify: () => payload
  }
})

const secretKey = 'secret'

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(secretKey)
}

describe('JWT Adapter', () => {
  describe('encrypt()', () => {
    test('Should call sign with correct values', () => {
      const sut = makeSut()
      const spySign = jest.spyOn(jwt, 'sign')
      sut.encrypt('any_value')
      expect(spySign).toHaveBeenCalledWith({ id: 'any_value' }, secretKey)
    })

    test('Should return a token on success', () => {
      const sut = makeSut()
      const token = sut.encrypt('any_value')
      expect(token).toBe('any_token')
    })

    test('Should throw if sign throws', () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
        throw new Error('Fake Error')
      })
      expect(() => sut.encrypt('any_value')).toThrow(new Error('Fake Error'))
    })
  })

  describe('decrypt()', () => {
    test('Should call sign with correct values', () => {
      const sut = makeSut()
      const spyVerify = jest.spyOn(jwt, 'verify')
      sut.decrypt('any_token')
      expect(spyVerify).toHaveBeenCalledWith('any_token', secretKey)
    })

    test('Should return null if verify returns null', () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => null)
      const decryptToken = sut.decrypt('any_token')
      expect(decryptToken).toBeNull()
    })

    test('Should return null if verify returns null', () => {
      const sut = makeSut()
      const decryptToken = sut.decrypt('any_token')
      expect(decryptToken).toBe('decrypted_token')
    })

    test('Should throw if verify throws', () => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        throw new Error('Fake Error')
      })
      expect(() => sut.decrypt('any_token')).toThrow(new Error('Fake Error'))
    })
  })
})
