import { SurveyModel } from '@/domain/models/survey/survey'

export type AddSurveyParams = Omit<SurveyModel, 'id' | 'date'>
export interface AddSurvey {
  add: (survey: AddSurveyParams) => Promise<void>
}
