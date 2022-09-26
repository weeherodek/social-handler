import { makeAddPhoneNumberAccount } from '@/main/factories/usecases/account/db-add-phone-number-account-factory'
import { AddPhoneNumberAccountController } from '@/presentation/controllers/account/add-phone-number-account-controller'

import { Controller } from '@/presentation/protocols/controller'
import { makeLogDecoratorHandler } from '../../../decorators/log-controller-decorator-factory'
import { makeValidatorDecoratorHandler } from '../../../decorators/validator-controller-decorator-factory'
import { makeAddPhoneNumberAccountValidation } from './add-phone-number-account-validation-factory'

export const makeAddPhoneNumberAccountController = (): Controller => {
  const addPhoneNumberAccountController = new AddPhoneNumberAccountController(makeAddPhoneNumberAccount())
  return makeValidatorDecoratorHandler(makeLogDecoratorHandler(addPhoneNumberAccountController), makeAddPhoneNumberAccountValidation())
}
