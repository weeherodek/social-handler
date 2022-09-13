import { LoadTemplateByNameRepository } from '@/data/protocols/db/template/load-template-by-name-repository'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template/template-mongo-repository'
import env from '../../../../config/env'

export const makeLoadTemplateByNameRepository = (): LoadTemplateByNameRepository => {
  return new TemplateMongoRepository(env.templateCollection)
}
