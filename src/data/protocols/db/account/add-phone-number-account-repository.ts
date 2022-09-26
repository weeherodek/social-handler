import { AddPhoneNumberAccountParams } from '@/domain/usecases/account/add-account-number'

export interface AddPhoneNumberAccountRepository {
  addPhoneNumber: (account: AddPhoneNumberAccountParams) => Promise<void>
}
