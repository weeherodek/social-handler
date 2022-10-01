import { SurveyModelLoadAllResponse } from '@/domain/usecases/survey/load-surveys'

export interface LoadSurveysRepository {
  loadAll: (accountId: string) => Promise<SurveyModelLoadAllResponse[]>
}
