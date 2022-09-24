import { SaveSurveyResult, SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { ForbiddenError } from '@/presentation/errors/'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadSurveyById, mockSaveSurveyResult } from '@/presentation/test/'
import { SaveSurveyResultController } from './save-survey-result-controller'

const mockRequest = (): HttpRequest<Pick<SaveSurveyResultParams, 'answer'>, never, Record<'surveyId', string>> => ({
  body: {
    answer: 'any_answer_1'
  },
  params: {
    surveyId: 'any_survey_id'
  },
  accountId: 'any_account_id'
})

type SutTypes = {
  saveSurveyResultStub: SaveSurveyResult
  loadSurveyByIdStub: LoadSurveyById
  sut: SaveSurveyResultController
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = mockSaveSurveyResult()
  const loadSurveyByIdStub = mockLoadSurveyById()
  const sut = new SaveSurveyResultController(loadSurveyByIdStub, saveSurveyResultStub)
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('Save Survey Result Controller', () => {
  test('Should call LoadSurveyById with correct value', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const spyLoadById = jest.spyOn(loadSurveyByIdStub, 'loadById')
    const request = mockRequest()
    await sut.handle(request)
    expect(spyLoadById).toHaveBeenCalledWith(request.params?.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should throw if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const spySaveResult = jest.spyOn(saveSurveyResultStub, 'saveResult')
    const request = mockRequest()
    const { answer } = request.body
    const accountId = request.accountId as string
    const { surveyId } = request.params
    await sut.handle(request)
    expect(spySaveResult).toHaveBeenCalledWith({ accountId, answer, surveyId })
  })

  test('Should throw if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'saveResult').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return 403 if a invalid answer if provided', async () => {
    const { sut } = makeSut()
    const request = mockRequest()
    request.body.answer = 'INVALID_ANSWER'
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })
})
