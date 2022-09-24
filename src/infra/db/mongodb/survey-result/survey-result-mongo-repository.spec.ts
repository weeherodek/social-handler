import { AccountModel } from '@/domain/models/account/account'
import { SurveyModel } from '@/domain/models/survey/survey'
import { mockAccountModel, mockSurveyModel } from '@/domain/test'
import env from '@/main/config/env'
import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

const surveyResultCollectionName = env.surveyResultCollection
const surveyCollectionName = env.surveyCollection
const accountCollectionName = env.accountCollection

let surveysCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection

const makeAccount = async (): Promise<AccountModel> => {
  const { insertedId } = await surveysCollection.insertOne(mockAccountModel())
  return {
    ...mockAccountModel(),
    id: insertedId.toString()
  }
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const { insertedId } = await surveysCollection.insertOne(mockSurveyModel())
  return {
    ...mockSurveyModel(),
    id: insertedId.toString()
  }
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
      expect(surveyResult.id).toBeDefined()
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult.answer).toBe(answer)
    })

    test('Should update a survey result if its not new', async () => {
      const sut = makeSut()
      const survey = await makeSurvey()
      const account = await makeAccount()
      const answerOne = survey.answers[0].answer
      const answerTwo = survey.answers[0].answer
      const res = await surveyResultCollection.insertOne({
        accountId: account.id,
        surveyId: survey.id,
        answer: answerOne,
        date: new Date()
      })
      const surveyResult = await sut.saveResult({
        accountId: account.id,
        surveyId: survey.id,
        answer: answerTwo
      })
      expect(surveyResult).toBeDefined()
      expect(surveyResult.id).toEqual(res.insertedId.toString())
      expect(surveyResult).not.toHaveProperty('_id')
      expect(surveyResult.answer).toBe(answerTwo)
    })
  })
})
