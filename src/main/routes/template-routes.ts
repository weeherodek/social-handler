import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeTemplateController } from '../factories/template'

export default (router: Router): void => {
  router.post('/template', adaptRoute(makeTemplateController()))
}
