import { TemplateModel } from '@/domain/models/template/template'

export interface AddTemplate {
  add: (template: AddTemplateParams) => Promise<TemplateModel | null>
}

export type AddTemplateParams = Omit<TemplateModel, 'id' | 'date'>
