import { AccountModel } from '@/domain/models/account/account'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<Omit<AccountModel, 'accessToken'> | null>
}

export type AddAccountModel = Omit< AccountModel, 'id' | 'date' | 'accessToken'>
