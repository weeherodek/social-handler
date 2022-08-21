import { AddAccountModel } from '@/domain/usecases/account/add-acount'

export interface AccountModel extends AddAccountModel {
  id: string
  date: Date
}
