import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export interface SurveyModel extends AddSurveyModel {
  id: string
  date: Date
}
