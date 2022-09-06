import { TemplateModel } from '@/domain/models/template/template'

export interface LoadTemplateByNameRepository {
  load: (name: string) => Promise<TemplateModel | null>
}
