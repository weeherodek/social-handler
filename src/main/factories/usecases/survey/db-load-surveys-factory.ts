import { DbLoadSurveys } from '@/data/usecases/survey/db-load-surveys'
import { LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { makeSurveyRepository } from '../../adapters/db/survey/db-survey-repository-factory'

export const makeLoadSurveys = (): LoadSurveys => {
  return new DbLoadSurveys(makeSurveyRepository())
}
