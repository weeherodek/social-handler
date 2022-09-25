import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'

export type SaveSurveyResultParams = Omit<SurveyResultModel, 'id' | 'date'>

export type SaveSurveyResultResponse = {
  surveyId: string
  answers: SurveyResultAnswerModel[]
  date: Date
}

type SurveyResultAnswerModel = {
  image?: string
  answer: string
  count: number
  percent: number
}

export interface SaveSurveyResult {
  saveResult: (data: SaveSurveyResultParams) => Promise<SaveSurveyResultResponse>
}
