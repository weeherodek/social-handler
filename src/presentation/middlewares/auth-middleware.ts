import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { ForbiddenError } from '../errors/forbidden-error'
import { ok } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (private readonly loadAccountByToken: LoadAccountByToken) {}
  async handle (httpRequest: HttpRequest): Promise<HttpResponse<Record<'accountId', string>>> {
    const accessToken = httpRequest.headers?.['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken)
      if (account) {
        return ok({ accountId: account.id })
      }
    }
    throw new ForbiddenError()
  }
}
