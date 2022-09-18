import { SurveyModel } from '@/domain/models/survey/survey'

export type AddSurveyModel = Omit<SurveyModel, 'id' | 'date'>
export interface AddSurvey {
  add: (survey: AddSurveyModel) => Promise<void>
}
