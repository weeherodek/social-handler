import { ValidatorControllerDecorator } from '@/main/decorators/validator-controller-decorator'

import { Controller } from '@/presentation/protocols/controller'
import { ValidationComposite } from '@/presentation/helpers/validators'

export const makeValidatorDecoratorController = (controller: Controller, validation: ValidationComposite): Controller => {
  return new ValidatorControllerDecorator(controller, validation)
}
