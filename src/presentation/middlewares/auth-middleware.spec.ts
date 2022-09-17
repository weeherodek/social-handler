import { AccountModel } from '@/domain/models/account/account'
import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { ForbiddenError } from '../errors/forbidden-error'
import { ok } from '../helpers/http/http-helper'
import { HttpRequest } from '../protocols/http'
import { AuthMiddleware } from './auth-middleware'

const makeRequestAccessToken = (): HttpRequest => {
  return {
    body: {},
    headers: {
      'x-access-token': 'any_token'
    }
  }
}

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
  accessToken: 'any_token',
  date: new Date()
})

const makeLoadAccountByToken = (): LoadAccountByToken => {
  class LoadAccountByTokenStub implements LoadAccountByToken {
    async load (accessToken: string): Promise<AccountModel | null> {
      return await Promise.resolve(makeFakeAccount())
    }
  }

  return new LoadAccountByTokenStub()
}

interface sutTypes {
  loadAccountByTokenStub: LoadAccountByToken
  sut: AuthMiddleware
}

const makeSut = (role?: string): sutTypes => {
  const loadAccountByTokenStub = makeLoadAccountByToken()
  const sut = new AuthMiddleware(loadAccountByTokenStub, role)
  return {
    sut,
    loadAccountByTokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return Forbidden if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const request: HttpRequest<any> = {
      body: {},
      headers: { not_exists: 'not_exists' }
    }
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenStub } = makeSut(role)
    const spyLoad = jest.spyOn(loadAccountByTokenStub, 'load')
    const request = makeRequestAccessToken()
    await sut.handle(request)
    expect(spyLoad).toHaveBeenCalledWith(request.headers?.['x-access-token'], role)
  })

  test('Should return Forbidden if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockResolvedValueOnce(null)
    const promise = sut.handle(makeRequestAccessToken())
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should return accountId on success', async () => {
    const { sut } = makeSut()
    const accountId = await sut.handle(makeRequestAccessToken())
    expect(accountId).toEqual(ok({ accountId: accountId.body.data?.accountId }))
  })

  test('Should throw if LoadAccountByToken throws', async () => {
    const { sut, loadAccountByTokenStub } = makeSut()
    jest.spyOn(loadAccountByTokenStub, 'load').mockImplementation(async () => await Promise.reject(new Error('Fake Error')))
    const promise = sut.handle(makeRequestAccessToken())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return ForbiddenError if headers is undefined', async () => {
    const { sut } = makeSut()
    const promise = sut.handle({ body: {} })
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })
})
