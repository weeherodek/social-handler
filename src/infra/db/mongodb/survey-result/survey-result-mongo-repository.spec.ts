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
  const { insertedId } = await accountCollection.insertOne(account)
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
      const accountOne = await makeAccount()
      const accountTwo = await makeAccount()
      const answer = survey.answers[0].answer
      await surveyResultCollection.insertMany([{
        accountId: new ObjectId(accountOne.id),
        surveyId: new ObjectId(survey.id),
        answer,
        date: new Date()
      },
      {
        accountId: new ObjectId(accountTwo.id),
        surveyId: new ObjectId(survey.id),
        answer,
        date: new Date()
      }])
      const surveyResult = await sut.loadByIdSurveyResult(survey.id, accountOne.id)
      expect(surveyResult).toBeDefined()
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult?.surveyId).toBe(survey.id)
      expect(surveyResult?.answers[0].count).toBe(2)
      expect(surveyResult?.answers[0].percent).toBe(100)
      expect(surveyResult?.answers[0].isCurrentAnswer).toBe(true)
      expect(surveyResult?.answers[1].count).toBe(0)
      expect(surveyResult?.answers[1].percent).toBe(0)
      expect(surveyResult?.answers[1].isCurrentAnswer).toBe(false)
    })

    test('Should load survey result 2', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const accountOne = await makeAccount()
      const accountTwo = await makeAccount()
      const answer = survey.answers[0].answer
      await surveyResultCollection.insertMany([{
        accountId: new ObjectId(accountOne.id),
        surveyId: new ObjectId(survey.id),
        answer,
        date: new Date()
      },
      {
        accountId: new ObjectId(accountTwo.id),
        surveyId: new ObjectId(survey.id),
        answer,
        date: new Date()
      }])
      const surveyResult = await sut.loadByIdSurveyResult(survey.id, accountTwo.id)
      expect(surveyResult).toBeDefined()
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult?.surveyId).toBe(survey.id)
      expect(surveyResult?.answers[0].count).toBe(2)
      expect(surveyResult?.answers[0].percent).toBe(100)
      expect(surveyResult?.answers[0].isCurrentAnswer).toBe(true)
      expect(surveyResult?.answers[1].count).toBe(0)
      expect(surveyResult?.answers[1].percent).toBe(0)
      expect(surveyResult?.answers[1].isCurrentAnswer).toBe(false)
    })

    test('Should return null if the survey has no answer', async () => {
      const sut = makeSut()
      const account = await makeAccount()
      const survey = await makeSurvey()
      const surveyResult = await sut.loadByIdSurveyResult(survey.id, account.id)
      expect(surveyResult).toBeNull()
    })
  })
})
