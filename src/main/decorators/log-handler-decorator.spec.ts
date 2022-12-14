import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { mockLogErrorRepository } from '@/data/test'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LogHandlerDecorator } from './log-handler-decorator'

const makeGenericRequest = (): HttpRequest<any, any, any> => ({ body: 'fake_body', headers: {}, params: {} })

const makeGenericController = (): Controller => {
  class GenericControllerStub implements Controller {
    async handle (httpRequest: HttpRequest<string>): Promise<HttpResponse<string>> {
      return {
        body: {
          statusCode: 200,
          data: 'fake_data',
          success: true
        },
        statusCode: 200
      }
    }
  }
  return new GenericControllerStub()
}

type SutTypes = {
  genericControllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
  sut: LogHandlerDecorator
}

const makeSut = (): SutTypes => {
  const genericControllerStub = makeGenericController()
  const logErrorRepositoryStub = mockLogErrorRepository()
  const sut = new LogHandlerDecorator(genericControllerStub, logErrorRepositoryStub)
  return {
    sut,
    genericControllerStub,
    logErrorRepositoryStub
  }
}

describe('Log Controller Decorator', () => {
  test('Should call controller with correct values', async () => {
    const { sut, genericControllerStub } = makeSut()
    const handleSpy = jest.spyOn(genericControllerStub, 'handle')
    const request = makeGenericRequest()
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })

  test('Should return the data of the called controller', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeGenericRequest())
    expect(httpResponse).toEqual({
      body: {
        statusCode: 200,
        data: 'fake_data',
        success: true
      },
      statusCode: 200
    })
  })

  test('Should throw the error if the controller throws', async () => {
    const { sut, genericControllerStub } = makeSut()
    jest.spyOn(genericControllerStub, 'handle').mockRejectedValueOnce(new MissingParamError('Fake Error'))
    const promise = sut.handle(makeGenericRequest())
    await expect(promise).rejects.toThrow(new MissingParamError('Fake Error'))
  })

  test('Should save the error before throws the error if is a unexpected error', async () => {
    const { sut, genericControllerStub, logErrorRepositoryStub } = makeSut()
    const fakeError = new Error('Fake Error')
    fakeError.stack = 'Fake Error Stack'
    jest.spyOn(genericControllerStub, 'handle').mockRejectedValueOnce(fakeError)
    const spyLog = jest.spyOn(logErrorRepositoryStub, 'logError')
    const request = makeGenericRequest()
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrowError(fakeError)
    expect(spyLog).toHaveBeenCalledWith({ params: { ...request }, stack: 'Fake Error Stack', controller: 'GenericControllerStub' })
  })

  test('Should not save the log if error is a not instance of generic error', async () => {
    const { sut, genericControllerStub, logErrorRepositoryStub } = makeSut()
    jest.spyOn(genericControllerStub, 'handle').mockRejectedValueOnce(new InvalidParamError('Fake Error'))
    const spyLog = jest.spyOn(logErrorRepositoryStub, 'logError')
    sut.handle(makeGenericRequest()).catch(() => {
      expect(spyLog).not.toHaveBeenCalled()
    })
  })
})
