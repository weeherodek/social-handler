import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Controller } from '@/presentation/protocols/controller'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class LoginController implements Controller {
  constructor (private readonly emailValidator: EmailValidator) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['email', 'password']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        throw new MissingParamError(field)
      }
    }

    const { email } = httpRequest.body

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      throw new InvalidParamError('email')
    }

    return await Promise.resolve({
      body: {
        anyBody: 'test',
        statusCode: 200,
        success: true
      },
      statusCode: 200
    })
  }
}
