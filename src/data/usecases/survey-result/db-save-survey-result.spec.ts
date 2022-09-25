import { LoadByIdSurveyResultRepository } from '@/data/protocols/db/survey-result/load-by-id-survey-result-repository'
import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { mockLoadByIdSurveyResultRepository, mockSaveSurveyResultRepository } from '@/data/test'
import { mockSaveSurveyResultParams, mockSurveyResultResponseModel } from '@/domain/test'
import { DbSaveSurveyResult } from './db-save-survey-result'

type SutTypes = {
  loadByIdSurveyResultRepositoryStub: LoadByIdSurveyResultRepository
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  sut: DbSaveSurveyResult
}

const makeSut = (): SutTypes => {
  const loadByIdSurveyResultRepositoryStub = mockLoadByIdSurveyResultRepository()
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub, loadByIdSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadByIdSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult Usecase', () => {
  test('Should call SaveSurveyResultRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const spySave = jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult')
    const addSurvey = mockSaveSurveyResultParams()
    await sut.saveResult(addSurvey)
    expect(spySave).toHaveBeenCalledWith(addSurvey)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.saveResult(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return a SurveyResult', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.saveResult(mockSaveSurveyResultParams())
    expect(surveyResult).toEqual(mockSurveyResultResponseModel())
  })

  test('Should call LoadByIdSurveyResultRepository with correct values', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub } = makeSut()
    const spyLoadById = jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult')
    const addSurvey = mockSaveSurveyResultParams()
    await sut.saveResult(addSurvey)
    expect(spyLoadById).toHaveBeenCalledWith(addSurvey.surveyId)
  })

  test('Should throw if LoadByIdSurveyResultRepository throws', async () => {
    const { sut, loadByIdSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(loadByIdSurveyResultRepositoryStub, 'loadByIdSurveyResult').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.saveResult(mockSaveSurveyResultParams())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })
})
