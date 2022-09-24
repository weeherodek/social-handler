
export const successComponent = (schema: string): Record<string, any> => ({
  type: 'object',
  properties: {
    data: {
      $ref: `#/schemas/${schema}`
    },
    statusCode: {
      type: 'number',
      example: 200
    },
    success: {
      type: 'boolean',
      example: true
    }
  }
})

export const createdComponent = (schema: string): Record<string, any> => ({
  type: 'object',
  properties: {
    data: {
      $ref: `#/schemas/${schema}`
    },
    statusCode: {
      type: 'number',
      example: 201
    },
    success: {
      type: 'boolean',
      example: true
    }
  }
})

export const noContentComponent = (): Record<string, any> => ({
  type: 'object',
  properties: {
    statusCode: {
      type: 'number',
      example: 204
    },
    success: {
      type: 'boolean',
      example: true
    }
  }
})
