import { SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from './db-save-survey-result'

const makeSurveyResultModel = (): SurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  date: new Date()
})

const makeSaveSurveyResultModel = (): SaveSurveyResultParams => ({
  surveyId: 'any_survey_id',
  accountId: 'any_account_id',
  answer: 'any_answer'
})

const makeSaveSurveyResultRepository = (): SaveSurveyResultRepository => {
  class SaveSurveyResultRepositoryStub implements SaveSurveyResultRepository {
    async saveResult (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
      return await Promise.resolve(makeSurveyResultModel())
    }
  }
  return new SaveSurveyResultRepositoryStub()
}

type SutTypes = {
  saveSurveyResultRepositoryStub: SaveSurveyResultRepository
  sut: DbSaveSurveyResult
}

const makeSut = (): SutTypes => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepository()
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
    const addSurvey = makeSaveSurveyResultModel()
    await sut.saveResult(addSurvey)
    expect(spySave).toHaveBeenCalledWith(addSurvey)
  })

  test('Should throw if SaveSurveyResultRepository throws', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'saveResult').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.saveResult(makeSaveSurveyResultModel())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return a SurveyResult', async () => {
    const { sut } = makeSut()
    const surveyResult = await sut.saveResult(makeSaveSurveyResultModel())
    expect(surveyResult).toEqual(makeSurveyResultModel())
  })
})
