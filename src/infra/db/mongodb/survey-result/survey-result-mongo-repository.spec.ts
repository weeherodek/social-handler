import { AccountModel } from '@/domain/models/account/account'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockAccountModel, mockSurveyModel } from '@/domain/test'
import env from '@/main/config/env'
import { Collection, ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

const surveyResultCollectionName = env.surveyResultCollection
const surveyCollectionName = env.surveyCollection
const accountCollectionName = env.accountCollection

let surveysCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeAccount = async (): Promise<AccountModel> => {
  const account = mockAccountModel()
  const { insertedId } = await surveysCollection.insertOne(account)
  return mockAccountModel(insertedId.toString())
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const survey = mockSurveyModel()
  const { insertedId } = await surveysCollection.insertOne(survey)
  return mockSurveyModel(insertedId.toString())
}

const makeSut = (): SurveyResultMongoRepository => {
  const sut = new SurveyResultMongoRepository(surveyResultCollectionName)
  return sut
}

describe('Survey Result Mongo Repository', () => {
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

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const answer = survey.answers[0].answer
      const surveyResult = await sut.saveResult({
        accountId: account.id,
        surveyId: survey.id,
        answer
      })
      expect(surveyResult).toBeDefined()
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult.surveyId).toBe(survey.id)
      expect(surveyResult.accountId).toBe(account.id)
      expect(surveyResult.answer).toBe(answer)
    })

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const answerOne = survey.answers[0].answer
      const answerTwo = survey.answers[1].answer
      await surveyResultCollection.insertOne({
        accountId: new ObjectId(account.id),
        surveyId: new ObjectId(survey.id),
        answer: answerOne,
        date: new Date()
      })
      const surveyResult = await sut.saveResult({
        accountId: account.id,
        surveyId: survey.id,
        answer: answerTwo
      })
      expect(surveyResult).toBeDefined()
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult.surveyId).toBe(survey.id)
      expect(surveyResult.accountId).toBe(account.id)
      expect(surveyResult.answer).toBe(answerTwo)
    })
  })

  describe('loadByIdSurveyResult', () => {
    test('Should load survey result', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const answerOne = survey.answers[0].answer
      const answerTwo = survey.answers[1].answer
      await surveyResultCollection.insertMany([{
        accountId: new ObjectId(account.id),
        surveyId: new ObjectId(survey.id),
        answer: answerOne,
        date: new Date()
      },
      {
        accountId: new ObjectId(account.id),
        surveyId: new ObjectId(survey.id),
        answer: answerTwo,
        date: new Date()
      }])
      const surveyResult = await sut.loadByIdSurveyResult(survey.id)
      expect(surveyResult).toBeDefined()
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult.surveyId).toBe(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
    })
  })
})
