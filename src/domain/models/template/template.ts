import { AddTemplateModel } from '@/domain/usecases/template/add-template'

export interface TemplateModel extends AddTemplateModel {
  id: string
  date: Date
}
