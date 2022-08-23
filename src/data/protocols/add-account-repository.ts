import { AccountModel } from '@/domain/models/account/account'
import { AddAccountModel } from '@/domain/usecases/account/add-acount'

export interface AddAccountRepository {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
