export const accessTokenSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string'
    }
  }
}

export const loginParamsSchema = {
  type: 'object',
  required: ['email', 'password'],
  properties: {
    email: {
      type: 'string',
      example: 'mail@mail.com'
    },
    password: {
      type: 'string',
      example: 'secret_password'
    }
  }
}
