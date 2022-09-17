import { DbAddSurvey } from '@/data/usecases/survey/db-add-survey'
import { AddSurvey } from '@/domain/usecases/survey/add-survey'
import { makeSurveyRepository } from '../../adapters/db/survey/db-survey-repository-factory'

export const makeAddSurvey = (): AddSurvey => {
  return new DbAddSurvey(makeSurveyRepository())
}
