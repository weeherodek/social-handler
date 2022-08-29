import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplateModel } from '@/domain/usecases/template/add-template'

export interface AddTemplateRepository {
  add: (template: AddTemplateModel) => Promise<TemplateModel>
}
