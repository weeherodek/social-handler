type AddTemplateField = {
  name: string
  required: boolean
  defaultValue?: string
}

export type TemplateModel = {
  id: string
  date: Date
  name: string
  text: string
  fields: AddTemplateField[]
}
