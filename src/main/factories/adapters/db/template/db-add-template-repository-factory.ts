import { AddTemplateRepository } from '@/data/protocols/db/template/add-template-repository'
import { TemplateMongoRepository } from '@/infra/db/mongodb/template/template-mongo-repository'
import env from '../../../../config/env'

export const makeAddTemplateRepository = (): AddTemplateRepository => {
  return new TemplateMongoRepository(env.templateCollection)
}
