import { AddTemplateModel } from '@/domain/usecases/template/add-template'

export type TemplateModel = {
  id: string
  date: Date
} & AddTemplateModel
