import { LogErrorModel } from '../models/log/error'
import { AddLogErrorParams } from '../usecases/log/error'

export const mockLogErrorModel = (id = 'any_id'): LogErrorModel => ({
  id,
  controller: 'any_controller',
  stack: 'any_stack',
  params: {
    any_params: 'any_params_value'
  },
  date: new Date()
})

export const mockAddLogErrorParams = (): AddLogErrorParams => ({
  controller: 'any_controller',
  params: {
    any_params: 'any_params_value'
  },
  stack: 'any_stack'
})
