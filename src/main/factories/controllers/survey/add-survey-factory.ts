import { AddSurveyController } from '@/presentation/controllers/survey/add-survey-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorController } from '../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorController } from '../../decorators/validator-controller-decorator-factory'
import { makeAddSurvey } from '../../usecases/add-survey/db-add-survey-factory'
import { makeAddSurveyValidation } from './add-survey-validation-factory'

export const makeAddSurveyController = (): Controller => {
  const addSurveyController = new AddSurveyController(makeAddSurvey())
  return makeValidatorDecoratorController(makeLogDecoratorController(addSurveyController), makeAddSurveyValidation())
}
