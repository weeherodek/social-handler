import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { LogMongoRepository } from '@/infra/db/mongodb/log/log-mongo-repository'
import env from '../../../../config/env'

export const makeLogErrorRepository = (): LogErrorRepository => {
  return new LogMongoRepository(env.errorLogCollection)
}
