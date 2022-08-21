import { InvalidParamError, MissingParamError } from '../../errors/'
import { badRequest, internalServerError } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator } from '../../protocols/'

export class SignUpController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {

  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (httpRequest.body[field] === undefined) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isValidEmail = this.emailValidator.isValid(httpRequest.body.email)
      if (!isValidEmail) {
        return badRequest(new InvalidParamError('email'))
      }
      return {
        body: 'ok',
        statusCode: 200
      }
    } catch (error) {
      return internalServerError()
    }
  }
}
