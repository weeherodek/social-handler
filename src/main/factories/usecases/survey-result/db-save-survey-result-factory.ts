import { DbSaveSurveyResult } from '@/data/usecases/survey-result/db-save-survey-result'
import { makeSurveyResultRepository } from '../../adapters/db/survey-result/db-survey-result-repository-factory'

export const makeSaveSurveyResult = (): DbSaveSurveyResult => {
  const surveyResultRepository = makeSurveyResultRepository()
  return new DbSaveSurveyResult(surveyResultRepository, surveyResultRepository)
}
