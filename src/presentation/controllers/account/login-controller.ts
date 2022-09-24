import { Authentication, AuthResponse, LoginParams } from '@/domain/usecases/account/authentication'
import { UnauthorizedError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest<LoginParams>): Promise<HttpResponse<AuthResponse>> {
    const { email, password } = httpRequest.body

    const accessToken = await this.authentication.auth({ email, password })

    if (!accessToken) throw new UnauthorizedError()

    return ok({ accessToken })
  }
}
