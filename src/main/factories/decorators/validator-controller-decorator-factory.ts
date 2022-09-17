import { ValidatorHandlerDecorator } from '@/main/decorators/validator-handler-decorator'

import { Controller } from '@/presentation/protocols/controller'
import { Middleware } from '@/presentation/protocols/middleware'
import { ValidationComposite } from '@/validation/validators'

export const makeValidatorDecoratorHandler = (handler: Controller | Middleware, validation: ValidationComposite): Controller => {
  return new ValidatorHandlerDecorator(handler, validation)
}
