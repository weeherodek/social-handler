import { SurveyModel } from '../models/survey/survey'
import { AddSurveyParams } from '../usecases/survey/add-survey'

export const mockSurveyModel = (id = 'any_id'): SurveyModel => ({
  id,
  question: 'any_question',
  date: new Date(),
  answers: [{
    answer: 'any_answer_1',
    image: 'any_image_1'
  }, {
    answer: 'any_answer_2',
    image: 'any_image_2'
  }]
})

export const mockAddSurveyParams = (): AddSurveyParams => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer_1',
    image: 'any_image_1'
  }, {
    answer: 'any_answer_2',
    image: 'any_image_2'
  }]
})
