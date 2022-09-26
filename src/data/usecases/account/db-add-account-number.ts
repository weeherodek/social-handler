import { AddPhoneNumberAccountRepository } from '@/data/protocols/db/account/add-phone-number-account-repository'
import { AddPhoneNumberAccount, AddPhoneNumberAccountParams } from '@/domain/usecases/account/add-account-number'

export class DbAddAccountNumber implements AddPhoneNumberAccount {
  constructor (private readonly addPhoneNumberAccountRepository: AddPhoneNumberAccountRepository) {}
  async addPhoneNumber (data: AddPhoneNumberAccountParams): Promise<void> {
    await this.addPhoneNumberAccountRepository.addPhoneNumber(data)
  }
}
