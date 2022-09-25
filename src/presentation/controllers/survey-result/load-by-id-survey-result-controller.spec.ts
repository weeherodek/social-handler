import { mockSurveyResultResponseModel } from '@/domain/test'
import { LoadByIdSurveyResult } from '@/domain/usecases/survey-result/load-survey-result'
import { ForbiddenError } from '@/presentation/errors'
import { ok } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { mockLoadByIdSurveyResult } from '@/presentation/test'
import { LoadByIdSurveyResultController } from './load-by-id-survey-result-controller'

const mockRequest = (): HttpRequest<any, never, Record<'surveyId', string>> => ({
  body: {},
  params: {
    surveyId: 'any_survey_id'
  }
})

type SutTypes = {
  sut: LoadByIdSurveyResultController
  loadByIdSurveyResultStub: LoadByIdSurveyResult
}

const makeSut = (): SutTypes => {
  const loadByIdSurveyResultStub = mockLoadByIdSurveyResult()
  const sut = new LoadByIdSurveyResultController(loadByIdSurveyResultStub)
  return {
    sut,
    loadByIdSurveyResultStub
  }
}

describe('Load By Id Survey Result Controller', () => {
  test('Should call LoadByIdSurveyResult with correct value', async () => {
    const { sut, loadByIdSurveyResultStub } = makeSut()
    const spyLoadById = jest.spyOn(loadByIdSurveyResultStub, 'loadResult')
    await sut.handle(mockRequest())
    expect(spyLoadById).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return ForbiddenError if LoadByIdSurveyResult returns null', async () => {
    const { sut, loadByIdSurveyResultStub } = makeSut()
    jest.spyOn(loadByIdSurveyResultStub, 'loadResult').mockResolvedValueOnce(null)
    const promise = sut.handle(mockRequest())
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should survey result on success', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.handle(mockRequest())
    expect(surveyResult).toEqual(ok(mockSurveyResultResponseModel()))
  })
})
