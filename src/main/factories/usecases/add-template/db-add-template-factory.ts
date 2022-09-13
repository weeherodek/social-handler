import { DbAddTemplate } from '@/data/usecases/template/db-add-template'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { makeAddTemplateRepository } from '../../adapters/db/template/db-add-template-repository-factory'
import { makeLoadTemplateByNameRepository } from '../../adapters/db/template/db-load-template-by-name-repository-factory'

export const makeAddTemplate = (): AddTemplate => {
  return new DbAddTemplate(makeAddTemplateRepository(), makeLoadTemplateByNameRepository())
}
