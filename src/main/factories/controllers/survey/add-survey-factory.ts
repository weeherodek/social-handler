import { AddSurveyController } from '@/presentation/controllers/survey/add-survey-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../decorators/validator-controller-decorator-factory'
import { makeAddSurvey } from '../../usecases/survey/db-add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurvey())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(addSurveyController), makeAddSurveyValidation())
}
