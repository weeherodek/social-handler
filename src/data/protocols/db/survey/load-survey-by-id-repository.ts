import { SurveyModel } from '@/domain/models/survey/survey'

export interface LoadSurveyByIdRepository {
  loadById: (surveyId: string) => Promise<SurveyModel | null>
}
