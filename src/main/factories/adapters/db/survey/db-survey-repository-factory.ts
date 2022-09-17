import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import env from '../../../../config/env'

export const makeSurveyRepository = (): SurveyMongoRepository => {
  return new SurveyMongoRepository(env.surveyCollection)
}
