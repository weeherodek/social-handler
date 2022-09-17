import { TemplateMongoRepository } from '@/infra/db/mongodb/template/template-mongo-repository'
import env from '../../../../config/env'

export const makeTemplateRepository = (): TemplateMongoRepository => {
  return new TemplateMongoRepository(env.templateCollection)
}
