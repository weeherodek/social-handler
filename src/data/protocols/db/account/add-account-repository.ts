import { AccountModel } from '@/domain/models/account/account'
import { AddAccountParams } from '@/domain/usecases/account/add-acount'

export interface AddAccountRepository {
  add: (account: AddAccountParams) => Promise<Omit<AccountModel, 'accessToken'>>
}
