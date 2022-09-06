import { TemplateModel } from '@/domain/models/template/template'

export interface LoadTemplateByNameRepository {
  loadByName: (name: string) => Promise<TemplateModel | null>
}
