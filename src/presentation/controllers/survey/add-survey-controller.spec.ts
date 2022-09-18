import { AddSurvey, AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { noContent } from '@/presentation/helpers/http/http-helper'
import { HttpRequest } from '@/presentation/protocols/http'
import { AddSurveyController } from './add-survey-controller'

const makeFakeRequest = (): HttpRequest<AddSurveyModel> => ({
  body: {
    question: 'any_question',
    answers: [
      {
        image: 'any_image',
        answer: 'any_answer'
      }
    ]
  }
})

const makeAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: AddSurveyModel): Promise<void> {
      return await Promise.resolve()
    }
  }

  return new AddSurveyStub()
}

type SutTypes = {
  addSurveyStub: AddSurvey
  sut: AddSurveyController
}

const makeSut = (): SutTypes => {
  const addSurveyStub = makeAddSurvey()
  const sut = new AddSurveyController(addSurveyStub)
  return {
    sut,
    addSurveyStub
  }
}

describe('Add Survey Controller', () => {
  test('Should call AddSurvey with correct values', async () => {
    const { sut, addSurveyStub } = makeSut()
    const spyAdd = jest.spyOn(addSurveyStub, 'add')
    const request = makeFakeRequest()
    await sut.handle(request)
    expect(spyAdd).toHaveBeenCalledWith(request.body)
  })

  test('Should throw if addSurvey throws', async () => {
    const { sut, addSurveyStub } = makeSut()
    jest.spyOn(addSurveyStub, 'add').mockImplementation(async () => await Promise.reject(new Error('Fake Error')))
    const promise = sut.handle(makeFakeRequest())
    await expect(promise).rejects.toThrow(new Error('Fake Error'))
  })

  test('Should return noContent on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(noContent())
  })
})
