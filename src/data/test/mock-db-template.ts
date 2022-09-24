import { TemplateModel } from '@/domain/models/template/template'
import { mockTemplateModel } from '@/domain/test'
import { AddTemplateParams } from '@/domain/usecases/template/add-template'
import { AddTemplateRepository } from '../protocols/db/template/add-template-repository'
import { LoadTemplateByNameRepository } from '../protocols/db/template/load-template-by-name-repository'

export const mockLoadTemplateByNameRepository = (): LoadTemplateByNameRepository => {
  class LoadTemplateByNameRepositoryStub implements LoadTemplateByNameRepository {
    async loadByName (name: string): Promise<TemplateModel | null> {
      return null
    }
  }

  return new LoadTemplateByNameRepositoryStub()
}

export const mockAddTemplateRepository = (): AddTemplateRepository => {
  class AddTemplateRepositoryStub implements AddTemplateRepository {
    async add (template: AddTemplateParams): Promise<TemplateModel> {
      return mockTemplateModel()
    }
  }

  return new AddTemplateRepositoryStub()
}
