import { DbAddSurvey } from '@/data/usecases/survey/db-add-survey'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { makeAddSurveyRepository } from '../../adapters/db/survey/db-add-survey-repository-factory'

export const makeAddSurvey = (): AddSurvey => {
  return new DbAddSurvey(makeAddSurveyRepository())
}
