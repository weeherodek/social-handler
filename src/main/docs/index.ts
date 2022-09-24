import { loginPath } from './paths'
import { accessTokenSchema, loginParamsSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Social Handler',
    description: 'API Social Handler',
    version: '1.5.1'
  },
  servers: [
    {
      url: '/api/',
      description: 'Current Environment'
    },
    {
      url: 'http:localhost:8080/api/',
      description: 'Local Host Server'
    },
    {
      url: 'https://socialhandler.com.br/api/',
      decription: 'Production Environment API'
    }
  ],
  tags: [
    {
      name: 'Login'
    }
  ],
  paths: {
    '/login': loginPath
  },
  schemas: {
    accessToken: accessTokenSchema,
    loginParams: loginParamsSchema
  }
}
