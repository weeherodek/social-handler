import { SurveyResultModel, SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { ObjectId } from 'mongodb'

export type SurveyResultModelMongo = {
  accountId: ObjectId
  surveyId: ObjectId
} & Omit<SurveyResultModel, 'accountId' | 'surveyId'>

export type SurveyResultResponseMongo = {
  surveyId: ObjectId
} & Omit<SurveyResultResponseModel, 'surveyId'>
