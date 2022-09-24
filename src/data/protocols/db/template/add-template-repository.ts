import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplateParams } from '@/domain/usecases/template/add-template'

export interface AddTemplateRepository {
  add: (template: AddTemplateParams) => Promise<TemplateModel>
}
