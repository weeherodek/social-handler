import { MissingParamError } from '@/presentation/errors'
import { LoginController } from './login'

describe('Login Controller', () => {
  test('Should throw MissingParamError if no email is provided', async () => {
    const sut = new LoginController()
    const promise = sut.handle({
      body: {
        password: 'any_password'
      }
    })
    await expect(promise).rejects.toThrow(new MissingParamError('email'))
  })

  test('Should throw MissingParamError if no password is provided', async () => {
    const sut = new LoginController()
    const promise = sut.handle({
      body: {
        email: 'any_email'
      }
    })
    await expect(promise).rejects.toThrow(new MissingParamError('password'))
  })
})
