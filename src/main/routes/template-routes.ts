import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddTemplateController } from '../factories/template/add-template-factory'

export default (router: Router): void => {
  router.post('/template', adaptRoute(makeAddTemplateController()))
}
