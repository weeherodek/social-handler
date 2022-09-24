import { AddTemplateRepository } from '@/data/protocols/db/template/add-template-repository'
import { LoadTemplateByNameRepository } from '@/data/protocols/db/template/load-template-by-name-repository'
import { mockAddTemplateRepository, mockLoadTemplateByNameRepository } from '@/data/test/'
import { mockAddTemplateParams, mockTemplateModel } from '@/domain/test'
import { AddTemplate } from '@/domain/usecases/template/add-template'
import { DbAddTemplate } from './db-add-template'

type SutTypes = {
  sut: AddTemplate
  addTemplateRepositoryStub: AddTemplateRepository
  loadTemplateByNameRepositoryStub: LoadTemplateByNameRepository
}

const makeSut = (): SutTypes => {
  const loadTemplateByNameRepositoryStub = mockLoadTemplateByNameRepository()
  const addTemplateRepositoryStub = mockAddTemplateRepository()
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
    const fakeTemplate = mockAddTemplateParams()
    await sut.add(fakeTemplate)
    expect(addSpy).toHaveBeenCalledWith(fakeTemplate)
  })

  test('Should return a new template on success', async () => {
    const { sut } = makeSut()
    const template = mockAddTemplateParams()
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
    const promise = sut.add(mockAddTemplateParams())
    await expect(promise).rejects.toThrow(new Error('Mock Error'))
  })

  test('Should call loadByName with correct value', async () => {
    const { sut, loadTemplateByNameRepositoryStub } = makeSut()
    const loadByNameSpy = jest.spyOn(loadTemplateByNameRepositoryStub, 'loadByName')
    const template = mockAddTemplateParams()
    await sut.add(template)
    expect(loadByNameSpy).toHaveBeenCalledWith(template.name)
  })

  test('Should return null if template already exists', async () => {
    const { sut, loadTemplateByNameRepositoryStub } = makeSut()
    jest.spyOn(loadTemplateByNameRepositoryStub, 'loadByName').mockResolvedValueOnce(mockTemplateModel())
    const newTemplate = await sut.add(mockAddTemplateParams())
    expect(newTemplate).toBeNull()
  })

  test('Should throw if LoadTemplateByNameRepository throws', async () => {
    const { sut, loadTemplateByNameRepositoryStub } = makeSut()
    jest.spyOn(loadTemplateByNameRepositoryStub, 'loadByName').mockRejectedValueOnce(new Error('Mock Error'))
    const promise = sut.add(mockAddTemplateParams())
    await expect(promise).rejects.toThrow(new Error('Mock Error'))
  })
})
