import { TemplateModel } from '../models/template/template'
import { AddTemplateParams } from '../usecases/template/add-template'

export const mockTemplateModel = (id = 'any_id'): TemplateModel => ({
  id,
  name: 'any_name',
  text: 'any_text',
  date: new Date(),
  fields: [{
    name: 'any_name_1',
    required: true,
    defaultValue: 'default_value_1'
  }, {
    name: 'any_name_2',
    required: false,
    defaultValue: 'default_value_2'
  }]
})

export const mockAddTemplateParams = (): AddTemplateParams => ({
  name: 'any_name',
  text: 'any_text',
  fields: [{
    name: 'any_name_1',
    required: true,
    defaultValue: 'default_value_1'
  }, {
    name: 'any_name_2',
    required: false,
    defaultValue: 'default_value_2'
  }]
})
