import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/survey/add-survey/add-survey-factory'
import { makeLoadSurveysController } from '../factories/controllers/survey/load-surveys/load-surveys-factory'
import { adminAuth, auth } from '../middlewares/'

export default (router: Router): void => {
  router.post('/survey', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
