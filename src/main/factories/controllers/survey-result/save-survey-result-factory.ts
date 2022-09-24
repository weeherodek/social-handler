import { SaveSurveyResultController } from '@/presentation/controllers/survey-result/save-survey-result-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../decorators/validator-controller-decorator-factory'
import { makeSaveSurveyResult } from '../../usecases/survey-result/db-save-survey-result-factory'
import { makeLoadSurveyById } from '../../usecases/survey/db-load-survey-by-id-factory'
import { makeSaveSurveyResultValidation } from './save-survey-result-validation-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const saveSurveyResultController = new SaveSurveyResultController(makeLoadSurveyById(), makeSaveSurveyResult())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(saveSurveyResultController), makeSaveSurveyResultValidation())
}
