import { DbLoadByIdSurveyResult } from '@/data/usecases/survey-result/db-load-by-id-survey-result'
import { LoadByIdSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { makeSurveyResultRepository } from '../../adapters/db/survey-result/db-survey-result-repository-factory'
import { makeSurveyRepository } from '../../adapters/db/survey/db-survey-repository-factory'

export const makeLoadByIdSurveyResult = (): LoadByIdSurveyResult => {
  return new DbLoadByIdSurveyResult(makeSurveyResultRepository(), makeSurveyRepository())
}
