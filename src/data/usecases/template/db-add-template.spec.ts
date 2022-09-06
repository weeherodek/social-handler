import { AddTemplateRepository } from '@/data/protocols/db/template/add-template-repository'
import { LoadTemplateByNameRepository } from '@/data/protocols/db/template/load-template-by-name-repository'
import { TemplateModel } from '@/domain/models/template/template'
import { AddTemplate, AddTemplateModel } from '@/domain/usecases/template/add-template'
import { DbAddTemplate } from './db-add-template'

jest.useFakeTimers({
  now: new Date('2020-01-01')
})

const makeFakeTemplateModel = (): TemplateModel => ({
  id: 'any_id',
  text: 'any_text',
  name: 'any_text',
  fields: [],
  date: new Date()
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

const makeLoadTemplateByNameRepository = (): LoadTemplateByNameRepository => {
  class LoadTemplateByNameRepositoryStub implements LoadTemplateByNameRepository {
    async loadByName (name: string): Promise<TemplateModel | null> {
      return null
    }
  }

  return new LoadTemplateByNameRepositoryStub()
}

const makeAddTemplateRepository = (): AddTemplateRepository => {
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
  addTemplateRepositoryStub: AddTemplateRepository
  loadTemplateByNameRepositoryStub: LoadTemplateByNameRepository
}

const makeSut = (): sutTypes => {
  const loadTemplateByNameRepositoryStub = makeLoadTemplateByNameRepository()
  const addTemplateRepositoryStub = makeAddTemplateRepository()
  const sut = new DbAddTemplate(addTemplateRepositoryStub, loadTemplateByNameRepositoryStub)
  return {
    sut,
    addTemplateRepositoryStub,
    loadTemplateByNameRepositoryStub
  }
}

describe('DbAddTemplate Usecase', () => {
  test('Should call AddTemplateRepository with correct values', async () => {
    const { sut, addTemplateRepositoryStub } = makeSut()
    const addSpy = jest.spyOn(addTemplateRepositoryStub, 'add')
    const fakeTemplate = makeFakeTemplate()
    await sut.add(fakeTemplate)
    expect(addSpy).toHaveBeenCalledWith(fakeTemplate)
  })

  test('Should return a new template on success', async () => {
    const { sut } = makeSut()
    const template = makeFakeTemplate()
    const newTemplate = await sut.add(template)
    expect(newTemplate).toEqual({
      ...template,
      id: 'any_id',
      date: new Date()
    })
  })

  test('Should throw if AddTemplateRepository throws', async () => {
    const { sut, addTemplateRepositoryStub } = makeSut()
    jest.spyOn(addTemplateRepositoryStub, 'add').mockRejectedValueOnce(new Error('Mock Error'))
    const template = makeFakeTemplate()
    const promise = sut.add(template)
    await expect(promise).rejects.toThrow(new Error('Mock Error'))
  })

  test('Should call loadByName with correct value', async () => {
    const { sut, loadTemplateByNameRepositoryStub } = makeSut()
    const loadByNameSpy = jest.spyOn(loadTemplateByNameRepositoryStub, 'loadByName')
    const template = makeFakeTemplate()
    await sut.add(template)
    expect(loadByNameSpy).toHaveBeenCalledWith(template.name)
  })

  test('Should return null if template already exists', async () => {
    const { sut, loadTemplateByNameRepositoryStub } = makeSut()
    jest.spyOn(loadTemplateByNameRepositoryStub, 'loadByName').mockResolvedValueOnce(makeFakeTemplateModel())
    const newTemplate = await sut.add(makeFakeTemplate())
    expect(newTemplate).toBeNull()
  })
})
