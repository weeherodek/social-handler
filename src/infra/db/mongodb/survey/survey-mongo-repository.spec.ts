import { AccountModel } from '@/domain/models/account/account'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockAccountModel, mockAddSurveyParams, mockSurveyModel } from '@/domain/test'
import env from '@/main/config/env'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'

const surveyCollectionName = env.surveyCollection
const surveyResultCollectionName = env.surveyResultCollection
const accountCollectionName = env.accountCollection

const makeSut = (): SurveyMongoRepository => {
  const sut = new SurveyMongoRepository(surveyCollectionName)
  return sut
}

const makeAccount = async (): Promise<AccountModel> => {
  const account = mockAccountModel()
  const { insertedId } = await accountCollection.insertOne(account)
  return mockAccountModel(insertedId.toString())
}

let surveysCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
    surveysCollection = await MongoHelper.getCollection(surveyCollectionName)
    surveyResultCollection = await MongoHelper.getCollection(surveyResultCollectionName)
    accountCollection = await MongoHelper.getCollection(accountCollectionName)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await surveysCollection.deleteMany({})
    await surveyResultCollection.deleteMany({})
    await accountCollection.deleteMany({})
  })
  describe('add()', () => {
    test('Should add a new survey', async () => {
      const sut = makeSut()
      const newSurvey = await sut.add(mockAddSurveyParams())
      expect(newSurvey).toBeUndefined()

      const survey = await surveysCollection.findOne<SurveyModel>({ question: 'any_question' })
      expect(survey).toBeDefined()
      expect(survey?.date).toBeInstanceOf(Date)
    })
  })

  describe('loadAll()', () => {
    test('Should return a list of survey', async () => {
      const account = await makeAccount()
      const sut = makeSut()
      const surveysData = [mockSurveyModel(), mockSurveyModel()]
      const result = await surveysCollection.insertMany(surveysData)
      await surveyResultCollection.insertOne({
        surveyId: result.insertedIds[0],
        accountId: new ObjectId(account.id),
        answer: mockSurveyModel().answers[0].answer,
        date: new Date()
      })
      const surveys = await sut.loadAll(account.id)
      expect(surveys.length).toBe(2)
      expect(surveys[0]).not.toHaveProperty('_id')
      expect(surveys[0]).toHaveProperty('id')
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1]).not.toHaveProperty('_id')
      expect(surveys[1]).toHaveProperty('id')
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should return a empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll(new ObjectId().toString())
      expect(surveys.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should return the expected survey', async () => {
      const sut = makeSut()
      const newSurvey = mockSurveyModel()
      const insertedSurvey = await surveysCollection.insertOne(newSurvey)
      const id = insertedSurvey.insertedId.toString()
      const survey = await sut.loadById(id)
      expect(survey).toBeDefined()
      expect(survey?.id).toBe(id)
      expect(survey).not.toHaveProperty('_id')
      expect(survey?.answers).toEqual(newSurvey.answers)
      expect(survey?.question).toEqual(newSurvey.question)
    })

    test('Should return null if result is not found', async () => {
      const sut = makeSut()
      const survey = await sut.loadById(new ObjectId().toString())
      expect(survey).toBeNull()
    })
  })
})
