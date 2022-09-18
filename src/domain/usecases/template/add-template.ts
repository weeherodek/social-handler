import { TemplateModel } from '@/domain/models/template/template'

export interface AddTemplate {
  add: (template: AddTemplateModel) => Promise<TemplateModel | null>
}

export type AddTemplateModel = Omit<TemplateModel, 'id' | 'date'>
