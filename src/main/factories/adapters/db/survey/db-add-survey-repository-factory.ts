import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { SurveyMongoRepository } from '@/infra/db/mongodb/survey/survey-mongo-repository'
import env from '../../../../config/env'

export const makeAddSurveyRepository = (): AddSurveyRepository => {
  return new SurveyMongoRepository(env.surveyCollection)
}
