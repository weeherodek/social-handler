import { DbSaveSurveyResult } from '@/data/usecases/survey-result/db-save-survey-result'
import { makeSurveyResultRepository } from '../../adapters/db/survey-result/db-survey-result-repository-factory'

export const makeSaveSurveyResult = (): DbSaveSurveyResult => {
  return new DbSaveSurveyResult(makeSurveyResultRepository())
}
