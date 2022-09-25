import { LoadByIdSurveyResultController } from '@/presentation/controllers/survey-result/load-by-id-survey-result-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../decorators/validator-controller-decorator-factory'
import { makeLoadByIdSurveyResult } from '../../usecases/survey-result/db-load-by-id-survey-result-factory'
import { makeLoadByIdSurveyResultValidation } from './load-by-id-survey-result-validation-factory'

export const makeLoadByIdSurveyResultController = (): Controller => {
  const saveSurveyResultController = new LoadByIdSurveyResultController(makeLoadByIdSurveyResult())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(saveSurveyResultController), makeLoadByIdSurveyResultValidation())
}
