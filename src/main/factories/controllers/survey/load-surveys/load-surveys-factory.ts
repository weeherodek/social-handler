import { LoadSurveysController } from '@/presentation/controllers/survey/load-surveys-controller'
import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../../decorators/log-controller-decorator-factory'
import { makeLoadSurveys } from '../../../usecases/survey/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const loadSurveysController = new LoadSurveysController(makeLoadSurveys())
  return makeLogDecoratorHandler(loadSurveysController)
}
