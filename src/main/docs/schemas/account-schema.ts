export const loginSchema = {
  type: 'object',
  properties: {
    accessToken: {
      type: 'string',
      example: 'any_token'
    },
    name: {
      type: 'string',
      example: 'any_name'
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

export const signupParamsSchema = {
  type: 'object',
  required: ['name', 'email', 'password', 'passwordConfirmation'],
  properties: {
    name: {
      type: 'string',
      example: 'John Doe'
    },
    email: {
      type: 'string',
      example: 'mail@mail.com'
    },
    password: {
      type: 'string',
      example: 'secret_password'
    },
    passwordConfirmation: {
      type: 'string',
      example: 'secret_password'
    }
  }
}

export const accountSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'any_id'
    },
    date: {
      type: 'date',
      example: '2022-01-01T10:05:28.877Z'
    },
    name: {
      type: 'string',
      example: 'John Doe'
    },
    email: {
      type: 'string',
      example: 'mail@mail.com'
    },
    password: {
      type: 'string',
      example: 'secret_password'
    },
    accessToken: {
      type: 'string',
      example: 'any_token'
    }
  }
}
