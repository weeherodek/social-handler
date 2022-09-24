import { SurveyResultMongoRepository } from '@/infra/db/mongodb/survey-result/survey-result-mongo-repository'
import env from '../../../../config/env'

export const makeSurveyResultRepository = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository(env.surveyResultCollection, env.surveyCollection, env.accountCollection)
}
