import { SurveyResultModel } from '@/domain/models/survey-result/survey-result'
import { SurveyModel } from '@/domain/models/survey/survey'
import { SaveSurveyResult, SaveSurveyResultModel } from '@/domain/usecases/survey-result/save-survey-result'
import { LoadSurveyById } from '@/domain/usecases/survey/load-survey-by-id'
import { ForbiddenError } from '@/presentation/errors/'
import { HttpRequest } from '@/presentation/protocols/http'
import { SaveSurveyResultController } from './save-survey-result-controller'

const makeFakeRequest = (): HttpRequest<Omit<SaveSurveyResultModel, 'surveyId'>, never, Record<'surveyId', string>> => ({
  body: {
    accountId: 'any_account_id',
    answer: 'any_answer'
  },
  params: {
    surveyId: 'any_survey_id'
  }
})

const makeSaveSurveyResult = (): SaveSurveyResult => {
  class SaveSurveyResultStub implements SaveSurveyResult {
    async saveResult (data: SaveSurveyResultModel): Promise<SurveyResultModel> {
      return {
        id: 'any_id',
        accountId: 'any_acccount_id',
        answer: 'any_answer',
        surveyId: 'any_survey_id',
        date: new Date()
      }
    }
  }
  return new SaveSurveyResultStub()
}

const makeLoadSurveyById = (): LoadSurveyById => {
  class LoadSurveyByIdStub implements LoadSurveyById {
    async loadById (id: string): Promise<SurveyModel | null> {
      return {
        id: 'any_id',
        answers: [{
          answer: 'any_answer',
          image: 'any_image_1'
        },
        {
          answer: 'any_answer_2',
          image: 'any_image_2'
        }],
        date: new Date(),
        question: 'any_question'
      }
    }
  }

  return new LoadSurveyByIdStub()
}

type SutTypes = {
  saveSurveyResultStub: SaveSurveyResult
  loadSurveyByIdStub: LoadSurveyById
  sut: SaveSurveyResultController
}

const makeSut = (): SutTypes => {
  const saveSurveyResultStub = makeSaveSurveyResult()
  const loadSurveyByIdStub = makeLoadSurveyById()
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
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(spyLoadById).toHaveBeenCalledWith(request.params?.surveyId)
  })

  test('Should return 403 if LoadSurveyById returns null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })

  test('Should throw if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const spySaveResult = jest.spyOn(saveSurveyResultStub, 'saveResult')
    const request = makeFakeRequest()
    const { accountId, answer } = request.body
    const { surveyId } = request.params
    await sut.handle(request)
    expect(spySaveResult).toHaveBeenCalledWith({ accountId, answer, surveyId })
  })

  test('Should throw if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    jest.spyOn(saveSurveyResultStub, 'saveResult').mockRejectedValueOnce(new Error('Fake Error'))
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return 403 if a invalid answer if provided', async () => {
    const { sut } = makeSut()
    const request = makeFakeRequest()
    request.body.answer = 'INVALID_ANSWER'
    const promise = sut.handle(request)
    await expect(promise).rejects.toThrow(new ForbiddenError())
  })
})
