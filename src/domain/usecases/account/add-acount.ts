import { AccountModel } from '@/domain/models/account/account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel | null>
}

export type AddAccountModel = {
  name: string
  email: string
  password: string
}
