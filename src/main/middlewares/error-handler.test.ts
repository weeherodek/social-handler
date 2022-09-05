import { InvalidParamError, InternalServerError, MissingParamError } from '@/presentation/errors'
import request from 'supertest'
import app from '../config/app'
import { errorHandler } from './error-handler'

describe('Error Handler Middleware', () => {
  test('Should handle the exception when is a invalid param', async () => {
    app.get('/test_invalid_param_error', () => {
      throw new InvalidParamError('Custom Error')
    }, errorHandler)
    await request(app)
      .get('/test_invalid_param_error')
      .expect({ error: new InvalidParamError('Custom Error').message, statusCode: 400, success: false })
      .expect(400)
  })

  test('Should handle the exception when is a missing param error', async () => {
    app.get('/test_missing_param_error', () => {
      throw new MissingParamError('Custom Error')
    }, errorHandler)
    await request(app)
      .get('/test_missing_param_error')
      .expect({ error: new MissingParamError('Custom Error').message, statusCode: 400, success: false })
      .expect(400)
  })

  test('Should handle the exception when is a internal server error', async () => {
    app.get('/test_internal_server_error', () => {
      throw new InternalServerError()
    }, errorHandler)
    await request(app)
      .get('/test_internal_server_error')
      .expect({ error: new InternalServerError().message, statusCode: 500, success: false })
      .expect(500)
  })

  test('Should handle the exception when is a generic error', async () => {
    app.get('/test_generic_error', () => {
      throw new Error()
    }, errorHandler)
    await request(app)
      .get('/test_generic_error')
      .expect({ error: 'Internal Server Error', statusCode: 500, success: false })
      .expect(500)
  })
})
