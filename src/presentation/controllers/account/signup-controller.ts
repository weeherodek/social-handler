import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountModel } from '@/domain/usecases/account/add-acount'
import { created } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { AlreadyExistsError } from '@/presentation/errors/already-exists-error'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest<AddAccountModel>): Promise<HttpResponse<AccountModel>> {
    const { email, password, name } = httpRequest.body
    const account = await this.addAccount.add({ name, email, password })
    if (account) {
      return created(account)
    }
    throw new AlreadyExistsError('User', email)
  }
}
