import { SurveyModel } from '@/domain/models/survey/survey'

export type SurveyModelLoadAllResponse = { didAnswer: boolean } & SurveyModel
export interface LoadSurveys {
  loadAll: (accountId: string) => Promise<SurveyModelLoadAllResponse[]>
}
