import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddTemplateController } from '../factories/template/template'

export default (router: Router): void => {
  router.post('/template', adaptRoute(makeAddTemplateController()))
}
