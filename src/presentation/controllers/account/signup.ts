import { AccountModel } from '@/domain/models/account/account'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { InvalidParamError, MissingParamError } from '../../errors/'
import { created } from '../../helpers/http-helper'
import { Controller, HttpRequest, HttpResponse, EmailValidator } from '../../protocols/'

export class SignUpController implements Controller {
  constructor (
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse<AccountModel>> {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        throw new MissingParamError(field)
      }
    }

    const { email, password, passwordConfirmation, name } = httpRequest.body
    const isValidEmail = this.emailValidator.isValid(email)
    if (!isValidEmail) {
      throw new InvalidParamError('email')
    }

    if (password !== passwordConfirmation) {
      throw new InvalidParamError('passwordConfirmation')
    }
    const account = await this.addAccount.add({ name, email, password })
    return created(account)
  }
}
