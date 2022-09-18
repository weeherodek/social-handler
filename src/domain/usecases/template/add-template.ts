import { TemplateModel } from '@/domain/models/template/template'

export interface AddTemplate {
  add: (template: AddTemplateModel) => Promise<TemplateModel | null>
}

export type AddTemplateModel = {
  name: string
  text: string
  fields: AddTemplateField[]
}

type AddTemplateField = {
  name: string
  required: boolean
  defaultValue?: string
}
