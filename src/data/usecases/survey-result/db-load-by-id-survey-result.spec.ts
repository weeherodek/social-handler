import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-id-survey-result-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { mockLoadByIdSurveyResultRepository } from '@/data/test'
import { mockSurveyResultResponseModel } from '@/domain/test'
import { ForbiddenError } from '@/presentation/errors'
import { mockLoadSurveyById } from '@/presentation/test'
import { DbLoadByIdSurveyResult } from './db-load-by-id-survey-result'

type SutTypes = {
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
  loadByIdSurveyResultRepositoryStub: LoadByIdSurveyResultRepository
  sut: DbLoadByIdSurveyResult
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = mockLoadSurveyById()
  const loadByIdSurveyResultRepositoryStub = mockLoadByIdSurveyResultRepository()
  const sut = new DbLoadByIdSurveyResult(loadByIdSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadByIdSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadByIdSurveyResult Usecase', () => {
  test('Should call LoadSurveyResultByIdRepository with correct value', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub } = makeSut()
    const spyLoadByIdSurveyResult = jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult')
    await sut.loadResult('any_survey_id')
    expect(spyLoadByIdSurveyResult).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return Survey Result on success', async () => {
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

  test('Should call LoadSurveyByIdRepository if LoadSurveyResultByIdRepository returns null', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult').mockResolvedValueOnce(null)
    const spyLoadById = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadResult('any_survey_id')
    expect(spyLoadById).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return ForbiddenError if LoadSurveyByIdRepository returns null', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult').mockResolvedValueOnce(null)
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockResolvedValueOnce(null)
    const promise = sut.loadResult('any_survey_id')
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should throw if DbLoadByIdSurveyResultRepository throws', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult').mockResolvedValueOnce(null)
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.loadResult('any_survey_id')
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
