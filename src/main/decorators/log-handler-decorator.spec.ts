import { LogErrorRepository } from '@/data/protocols/db/log/log-error-repository'
import { InvalidParamError, MissingParamError } from '@/presentation/errors'
import { Controller } from '@/presentation/protocols/controller'
import { HttpRequest, HttpResponse } from '@/presentation/protocols/http'
import { LogHandlerDecorator } from './log-handler-decorator'

const makeGenericRequest = (): HttpRequest => ({ body: 'fake_body' })

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

const makeLogErrorRepository = (): LogErrorRepository => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async logError (errorData: { stack: string, params: Record<any, any>, controller: string }): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new LogErrorRepositoryStub()
}

interface sutTypes {
  genericControllerStub: Controller
  logErrorRepositoryStub: LogErrorRepository
  sut: LogHandlerDecorator
}

const makeSut = (): sutTypes => {
  const genericControllerStub = makeGenericController()
  const logErrorRepositoryStub = makeLogErrorRepository()
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
    const promise = sut.handle(makeGenericRequest())
    await expect(promise).rejects.toThrowError(fakeError)
    expect(spyLog).toHaveBeenCalledWith({ params: { body: 'fake_body' }, stack: 'Fake Error Stack', controller: 'GenericControllerStub' })
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
