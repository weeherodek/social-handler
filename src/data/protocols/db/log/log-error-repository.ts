import { AddLogErrorParams } from '@/domain/usecases/log/error'

export interface LogErrorRepository {
  logError: (errorData: AddLogErrorParams) => Promise<void>
}
