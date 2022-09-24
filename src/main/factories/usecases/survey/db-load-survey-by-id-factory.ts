import { DbLoadSurveyById } from '@/data/usecases/survey/db-load-survey-by-id'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { makeSurveyRepository } from '../../adapters/db/survey/db-survey-repository-factory'

export const makeLoadSurveyById = (): LoadSurveyById => {
  return new DbLoadSurveyById(makeSurveyRepository())
}
