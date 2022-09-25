import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-id-survey-result-repository'
import { mockLoadByIdSurveyResultRepository } from '@/data/test'
import { mockSurveyResultResponseModel } from '@/domain/test'
import { DbLoadByIdSurveyResult } from './db-load-by-id-survey-result'

type SutTypes = {
  loadByIdSurveyResultRepositoryStub: LoadByIdSurveyResultRepository
  sut: DbLoadByIdSurveyResult
}

const makeSut = (): SutTypes => {
  const loadByIdSurveyResultRepositoryStub = mockLoadByIdSurveyResultRepository()
  const sut = new DbLoadByIdSurveyResult(loadByIdSurveyResultRepositoryStub)
  return {
    sut,
    loadByIdSurveyResultRepositoryStub
  }
}

describe('DbLoadByIdSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultByIdRepository with correct value', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub } = makeSut()
    const spyLoadByIdSurveyResult = jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult')
    await sut.loadResult('any_survey_id')
    expect(spyLoadByIdSurveyResult).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return Survey Result', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.loadResult('any_survey_id')
    expect(surveyResult).toEqual(mockSurveyResultResponseModel())
  })

  test('Should throw if DbLoadByIdSurveyResultRepository throws', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.loadResult('any_survey_id')
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
