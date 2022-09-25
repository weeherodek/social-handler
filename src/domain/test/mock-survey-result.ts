import { SurveyResultModel } from '../models/survey-result/survey-result'
import { SaveSurveyResultParams, SaveSurveyResultResponse } from '../usecases/survey-result/save-survey-result'

export const mockSurveyResultModel = (id = 'any_id'): SurveyResultModel => ({
  id,
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
  surveyId: 'any_survey_id'
})

export const mockSaveSurveyResultResponse = (): SaveSurveyResultResponse => ({
  surveyId: 'any_survey_id',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50,
    image: 'any_image'
  },
  {
    answer: 'any_answer_2',
    count: 2,
    percent: 50,
    image: 'any_image'
  }
  ],
  date: new Date()
})

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id'
})
