import { AddPhoneNumberAccountParams } from '@/domain/usecases/account/add-phone-number-account'

export interface AddPhoneNumberAccountRepository {
  addPhoneNumber: (account: AddPhoneNumberAccountParams) => Promise<void>
}
