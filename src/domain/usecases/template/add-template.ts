import { TemplateModel } from '@/domain/models/template/template'

export interface AddTemplate {
  add: (template: AddTemplateModel) => Promise<TemplateModel>
}

export interface AddTemplateModel {
  name: string
  text: string
  fields: AddTemplateField[]
}

interface AddTemplateField {
  name: string
  required: boolean
  defaultValue?: string
}
