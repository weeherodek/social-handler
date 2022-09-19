import { AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { LoadSurveyByIdRepository } from '@/data/protocols/db/survey/load-survey-by-id-repository'
import { LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { SurveyModel } from '@/domain/models/survey/survey'
import { AddSurveyModel } from '@/domain/usecases/survey/add-survey'
import { ObjectId } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  constructor (private readonly surveyCollection: string) {}
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection(this.surveyCollection)
    await surveyCollection.insertOne({ ...surveyData, date: new Date() })
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection(this.surveyCollection)
    const surveys = await surveyCollection.find({}).toArray()
    return MongoHelper.mapArray<SurveyModel>(surveys)
  }

  async loadById (id: string): Promise<SurveyModel | null> {
    const surveyCollection = await MongoHelper.getCollection(this.surveyCollection)
    const survey = await surveyCollection.findOne({ _id: new ObjectId(id) })
    return (survey && MongoHelper.map<SurveyModel>(survey))
  }
}
