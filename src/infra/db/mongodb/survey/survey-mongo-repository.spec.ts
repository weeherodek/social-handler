import { SurveyModel } from '@/domain/models/survey/survey'
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
  describe('add()', () => {
    test('Should add a new survey', async () => {
      const sut = makeSut()
      const newSurvey = await sut.add(makeFakeSurvey())
      expect(newSurvey).toBeUndefined()

      const survey = await collectionSurveys.findOne<SurveyModel>({ question: 'any_question' })
      expect(survey).toBeDefined()
      expect(survey?.date).toBeInstanceOf(Date)
    })
  })

  describe('loadAll()', () => {
    test('Should retun a list of survey', async () => {
      const sut = makeSut()
      await collectionSurveys.insertMany([makeFakeSurvey(), makeFakeSurvey()])
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(2)
      expect(surveys[0]).not.toHaveProperty('_id')
      expect(surveys[0]).toHaveProperty('id')
      expect(surveys[1]).not.toHaveProperty('_id')
      expect(surveys[1]).toHaveProperty('id')
    })

    test('Should retun a empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys.length).toBe(0)
    })
  })
})
