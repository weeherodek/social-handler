import { Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeSignupController } from '../factories/controllers/account/signup/signup-controller-factory'
import { makeLoginController } from '../factories/controllers/account/login/login-controller-factory'
import { auth } from '../middlewares'
import { makeAddPhoneNumberAccountController } from '../factories/controllers/account/phone-number/add-phone-number-account-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignupController()))
  router.post('/login', adaptRoute(makeLoginController()))
  router.post('/account/phone-number', auth, adaptRoute(makeAddPhoneNumberAccountController()))
}
