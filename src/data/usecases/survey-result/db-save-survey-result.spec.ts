import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { mockSaveSurveyResultRepository } from '@/data/test'
import { mockSaveSurveyResultParams, mockSaveSurveyResultResponse } from '@/domain/test'
import { DbSaveSurveyResult } from './db-save-survey-result'

type SutTypes = {
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  sut: DbSaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepository()
  const sut = new DbSaveSurveyResult(saveSurveyResultRepositoryStub)
  return {
    sut,
    saveSurveyResultRepositoryStub
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
    expect(surveyResult).toEqual(mockSaveSurveyResultResponse())
  })
})
