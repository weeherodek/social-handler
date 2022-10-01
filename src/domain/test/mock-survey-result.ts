import { SurveyResultModel, SurveyResultResponseModel } from '../models/survey-result/survey-result'
import { SaveSurveyResultParams } from '../usecases/survey-result/save-survey-result'

export const mockSurveyResultModel = (id = 'any_id'): SurveyResultModel => ({
  id,
  accountId: 'any_account_id',
  answer: 'any_answer',
  date: new Date(),
  surveyId: 'any_survey_id'
})

export const mockSurveyResultResponseModel = (): SurveyResultResponseModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    count: 1,
    percent: 50,
    isCurrentAnswer: true,
    image: 'any_image'
  },
  {
    answer: 'any_answer_2',
    count: 2,
    percent: 50,
    isCurrentAnswer: true,
    image: 'any_image'
  }
  ],
  date: new Date()
})

export const mockSurveyResultResponseModelWithNoAnswers = (): SurveyResultResponseModel => ({
  surveyId: 'any_survey_id',
  question: 'any_question',
  date: new Date(),
  answers: [{
    answer: 'any_answer_1',
    image: 'any_image_1',
    percent: 0,
    isCurrentAnswer: false,
    count: 0
  },
  {
    answer: 'any_answer_2',
    image: 'any_image_2',
    isCurrentAnswer: false,
    percent: 0,
    count: 0
  }]
})

export const mockSaveSurveyResultParams = (): SaveSurveyResultParams => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id'
})
