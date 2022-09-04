import { AccountModel } from '@/domain/models/account/account'
import { AddAccount } from '@/domain/usecases/account/add-acount'
import { ApplicationError } from '@/presentation/errors/'
import { created } from '@/presentation/helpers/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { Validation } from '@/presentation/helpers/validators/validation'

export class SignUpController implements Controller {
  constructor (
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
    const account = await this.addAccount.add({ name, email, password })
    return created(account)
  }
}
