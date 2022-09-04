import { AccountModel } from '@/domain/models/account/account'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { ApplicationError, InvalidParamError } from '@/presentation/errors/'
import { created } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { EmailValidator } from '@/presentation/protocols/email-validator'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/helpers/validators/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<AccountModel>> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      throw new ApplicationError(error, 400)
    }

    const { email, password, name } = httpRequest.body
    const isValidEmail = this.emailValidator.isValid(email)
    if (!isValidEmail) {
      throw new InvalidParamError('email')
    }
    const account = await this.addAccount.add({ name, email, password })
    return created(account)
  }
}
