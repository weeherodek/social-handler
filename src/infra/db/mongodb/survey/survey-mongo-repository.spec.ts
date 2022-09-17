import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const surveyCollectionName = env.surveyCollection

const makeFakeSurvey = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    answer: 'any_answer',
    image: 'any_image'
  }]
})

const makeSut = (): SurveyMongoRepository => {
  const sut = new SurveyMongoRepository(surveyCollectionName)
  return sut
}

let collectionSurveys: Collection
describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    collectionSurveys = await MongoHelper.getCollection(surveyCollectionName)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await collectionSurveys.deleteMany({})
  })

  test('Should add a new survey', async () => {
    const sut = makeSut()
    const newSurvey = await sut.add(makeFakeSurvey())
    expect(newSurvey).toBeUndefined()

    const survey = await collectionSurveys.findOne({ question: 'any_question' })
    expect(survey).toBeDefined()
  })
})
