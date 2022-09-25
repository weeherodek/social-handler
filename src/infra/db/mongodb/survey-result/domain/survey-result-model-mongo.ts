import { SurveyResultModel, SurveyResultResponseModel } from '@/domain/models/survey-result/survey-result'
import { ObjectId } from 'mongodb'

export type SurveyResultModelMongo = {
  _id: ObjectId
  accountId: ObjectId
  surveyId: ObjectId
} & Omit<SurveyResultModel, 'accountId' | 'surveyId' | 'id'>

export type SurveyResultResponseMongo = {
  surveyId: ObjectId
} & Omit<SurveyResultResponseModel, 'surveyId'>
