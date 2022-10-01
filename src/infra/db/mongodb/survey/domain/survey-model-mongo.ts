import { SurveyModelLoadAllResponse } from '@/domain/usecases/survey/load-surveys'
import { ObjectId } from 'mongodb'

export type SurveyLoadAllModelMongo = {
  _id: ObjectId
} & Omit<SurveyModelLoadAllResponse, 'id'>
