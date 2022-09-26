import { AddPhoneNumberAccount } from '@/domain/usecases/account/add-phone-number-account'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'

export class AddPhoneNumberAccountController implements Controller {
  constructor (private readonly addPhoneNumberAccount: AddPhoneNumberAccount) {}
  async handle (httpRequest: HttpRequest<Record<'phoneNumber', string>>): Promise<HttpResponse<null>> {
    const accountId = httpRequest.accountId as string
    const { phoneNumber } = httpRequest.body
    await this.addPhoneNumberAccount.addPhoneNumber({ accountId, phoneNumber })
    return noContent()
  }
}
