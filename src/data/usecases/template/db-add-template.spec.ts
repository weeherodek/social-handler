import { AddTemplateRepository } from '@/data/protocols/add-template-repository'
import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'
import { DbAddTemplate } from './db-add-template'

jest.useFakeTimers({
  now: new Date('2020-01-01')
})

const makeFakeTemplate = (): AddTemplateModel => ({
  name: 'any_name',
  text: 'any_text',
  fields: [
    {
      name: 'any_field_name',
      required: false
    },
    {
      name: 'any_field_name_2',
      required: true,
      defaultValue: 'any_default_value'
    }
  ]
})

const makeAddTemplateRepositoryStub = (): AddTemplateRepository => {
  class AddTemplateRepositoryStub implements AddTemplateRepository {
    async add (template: AddTemplateModel): Promise<TemplateModel> {
      return {
        ...makeFakeTemplate(),
        id: 'any_id',
        date: new Date()
      }
    }
  }

  return new AddTemplateRepositoryStub()
}

interface sutTypes {
  sut: AddTemplate
  addTemplateRepository: AddTemplateRepository
}

const makeSut = (): sutTypes => {
  const addTemplateRepository = makeAddTemplateRepositoryStub()
  const sut = new DbAddTemplate(addTemplateRepository)
  return {
    sut,
    addTemplateRepository
  }
}

describe('DbAddTemplate Usecase', () => {
  test('Should call cryptographer with correct password', async () => {
    const { sut, addTemplateRepository } = makeSut()
    const addSpy = jest.spyOn(addTemplateRepository, 'add')
    const fakeTemplate = makeFakeTemplate()
    await sut.add(fakeTemplate)
    expect(addSpy).toHaveBeenCalledWith(fakeTemplate)
  })
})
