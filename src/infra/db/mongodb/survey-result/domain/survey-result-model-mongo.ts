import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultResponse } from '@/domain/usecases/survey-result/save-survey-result'
import { ObjectId } from 'mongodb'

export type SurveyResultModelMongo = {
  accountId: ObjectId
  surveyId: ObjectId
} & Omit<SurveyResultModel, 'accountId' | 'surveyId'>

export type SurveyResultResponseMongo = {
  surveyId: ObjectId
} & Omit<SaveSurveyResultResponse, 'surveyId'>
