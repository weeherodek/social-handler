import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoadByIdSurveyResultController } from '../factories/controllers/survey-result/load-by-id-survey-result-factory'
import { makeSaveSurveyResultController } from '../factories/controllers/survey-result/save-survey-result-factory'
import { auth } from '../middlewares'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadByIdSurveyResultController()))
}
