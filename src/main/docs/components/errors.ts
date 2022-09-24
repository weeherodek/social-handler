export const badRequestComponent = {
  description: 'Bad Request',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Bad Request'
          },
          statusCode: {
            type: 'number',
            example: 400
          },
          success: {
            type: 'boolean',
            example: false
          }
        }
      }
    }
  }
}

export const forbiddenComponent = {
  description: 'Forbidden',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Forbidden'
          },
          statusCode: {
            type: 'number',
            example: 403
          },
          success: {
            type: 'boolean',
            example: false
          }
        }
      }
    }
  }
}

export const internalServerErrorComponent = {
  description: 'Internal Server Error',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Internal Server Error'
          },
          statusCode: {
            type: 'number',
            example: 500
          },
          success: {
            type: 'boolean',
            example: false
          }
        }
      }
    }
  }
}

export const unauthorizedComponent = {
  description: 'Unauthorized',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'string',
            example: 'Unauthorized'
          },
          statusCode: {
            type: 'number',
            example: 401
          },
          success: {
            type: 'boolean',
            example: false
          }
        }
      }
    }
  }
}
