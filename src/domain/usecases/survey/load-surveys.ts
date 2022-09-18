import { SurveyModel } from '@/domain/models/survey/survey'

export interface LoadSurveys {
  loadAll: () => Promise<SurveyModel[]>
}
