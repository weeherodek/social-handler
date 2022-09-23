import { LoadAccountByToken } from '@/domain/usecases/account/load-account-by-token'
import { UnauthorizedError, ForbiddenError } from '../errors'
import { ok } from '../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from '../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor (
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle (httpRequest: HttpRequest<{}, Record<'x-access-token', string | null | undefined>>): Promise<HttpResponse<Record<'accountId', string>>> {
    const accessToken = httpRequest.headers['x-access-token']
    if (accessToken) {
      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (account) {
        return ok({ accountId: account.id })
      }
      throw new ForbiddenError()
    }
    throw new UnauthorizedError()
  }
}
