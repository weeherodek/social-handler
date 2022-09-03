import { AddLogErrorModel } from '@/domain/usecases/log/error'

export interface LogErrorModel extends AddLogErrorModel {
  id: string
  date: Date
}
