import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'

export type SurveyModel = {
  id: string
  date: Date
} & AddSurveyModel
