import { ApplicationError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http/http-helper'
import { Validation } from '@/presentation/protocols/validation'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { ValidatorHandlerDecorator } from './validator-handler-decorator'

const makeFakeRequest = (): HttpRequest<any, any, any> => ({
  body: {
    anyField: 'anyField'
  },
  headers: {},
  params: {}
})

const makeGenericController = (): Controller => {
  class GenericControllerStub implements Controller {
    async handle (httpRequest: HttpRequest<any>): Promise<HttpResponse<any>> {
      return ok({ anyField: 'any_value' })
    }
  }
  return new GenericControllerStub()
}

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (data: any): string | null {
      return null
    }
  }
  return new ValidationStub()
}

type SutTypes = {
  sut: ValidatorHandlerDecorator
  genericControllerStub: Controller
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const genericControllerStub = makeGenericController()
  const validationStub = makeValidation()
  const sut = new ValidatorHandlerDecorator(genericControllerStub, validationStub)
  return {
    sut,
    genericControllerStub,
    validationStub
  }
}

describe('Validator Decorator', () => {
  test('Should call the validator with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(validationSpy).toHaveBeenCalledWith(request.body)
  })

  test('Should call the controller with correct values', async () => {
    const { sut, genericControllerStub } = makeSut()
    const handleSpy = jest.spyOn(genericControllerStub, 'handle')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })

  test('Should not call the controller if validation fails', async () => {
    const { sut, genericControllerStub, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error('Fake Error').message)
    const handleSpy = jest.spyOn(genericControllerStub, 'handle')
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new ApplicationError('Fake Error', 400))
    expect(handleSpy).not.toHaveBeenCalled()
  })
})
