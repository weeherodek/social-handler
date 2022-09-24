import { TemplateModel } from '@/domain/models/template/template'
import { mockTemplateModel } from '@/domain/test'
import { AddTemplate, AddTemplateParams } from '@/domain/usecases/template/add-template'

export const mockAddTemplate = (): AddTemplate => {
  class AddTemplateStub implements AddTemplate {
    async add (template: AddTemplateParams): Promise<TemplateModel> {
      return mockTemplateModel()
    }
  }
  return new AddTemplateStub()
}
