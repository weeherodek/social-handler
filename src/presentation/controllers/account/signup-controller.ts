import { AccountModel } from '@/domain/models/account/account'
import { AddAccount, AddAccountParams } from '@/domain/usecases/account/add-acount'
import { created } from '@/presentation/helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { Controller } from '@/presentation/protocols/controller'
import { AlreadyExistsError } from '@/presentation/errors/already-exists-error'
import { Authentication, AuthResponse } from '@/domain/usecases/account/authentication'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest<AddAccountParams>): Promise<HttpResponse<AccountModel>> {
    const { email, password, name } = httpRequest.body
    const account = await this.addAccount.add({ name, email, password })
    if (account) {
      const { accessToken } = await this.authentication.auth({ email, password }) as AuthResponse
      return created({ ...account, accessToken })
    }
    throw new AlreadyExistsError('User', email)
  }
}
