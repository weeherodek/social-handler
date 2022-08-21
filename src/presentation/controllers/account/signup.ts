import { AddAccount } from '@/domain/usecases/account/add-acount'
import { InvalidParamError, MissingParamError } from '../../errors/'
import { badRequest, internalServerError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator } from '../../protocols/'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }

      const { email, password, passwordConfirmation, name } = httpRequest.body
      const isValidEmail = this.emailValidator.isValid(email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }
      const account = this.addAccount.add({ name, email, password })
      return {
        body: account,
        statusCode: 200
      }
    } catch (error) {
      return internalServerError()
    }
  }
}
