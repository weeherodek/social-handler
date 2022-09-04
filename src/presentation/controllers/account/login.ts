import { Authentication, AuthResponse } from '@/domain/usecases/account/authentication'
import { InvalidParamError, MissingParamError, UnauthorizedError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoginController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<AuthResponse>> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        throw new MissingParamError(field)
      }
    }

    const { email, password } = httpRequest.body

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      throw new InvalidParamError('email')
    }

    const accessToken = await this.authentication.auth(email, password)

    if (!accessToken) {
      throw new UnauthorizedError()
    }

    return ok(accessToken)
  }
}
