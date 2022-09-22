import { AccountModel } from '@/domain/models/account/account'
import { SurveyModel } from '@/domain/models/survey/survey'
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
  const accountModel: Omit<AccountModel, 'id'> = {
    name: 'any_name',
    email: 'any_email',
    password: 'any_password',
    accessToken: 'any_token',
    date: new Date()
  }
  const { insertedId } = await surveysCollection.insertOne(accountModel)
  return {
    ...accountModel,
    id: insertedId.toString()
  }
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const surveyModel: Omit<SurveyModel, 'id'> = {
    question: 'any_question',
    answers: [
      {
        answer: 'any_answer_1',
        image: 'any_image'
      },
      {
        answer: 'any_answer_2'
      }
    ],
    date: new Date()
  }
  const { insertedId } = await surveysCollection.insertOne(surveyModel)
  return {
    ...surveyModel,
    id: insertedId.toString()
  }
}

const makeSut = (): SurveyResultMongoRepository => {
  const sut = new SurveyResultMongoRepository(surveyResultCollectionName, surveyCollectionName, accountCollectionName)
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
  })
})
