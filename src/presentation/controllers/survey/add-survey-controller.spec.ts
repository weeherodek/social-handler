import { AddSurvey, AddSurveyModel } from '@/data/usecases/survey/add-survey'
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

interface sutTypes {
  addSurveyStub: AddSurvey
  sut: AddSurveyController
}

const makeSut = (): sutTypes => {
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
})
