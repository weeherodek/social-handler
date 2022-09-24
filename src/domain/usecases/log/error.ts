import { LogErrorModel } from '@/domain/models/log/error'

export type AddLogErrorParams = Omit<LogErrorModel, 'id' | 'date'>
