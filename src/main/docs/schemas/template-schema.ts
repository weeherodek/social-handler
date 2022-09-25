export const templateSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'any_id'
    },
    name: {
      type: 'string',
      example: 'any_name'
    },
    text: {
      type: 'string',
      example: 'any_text: {{any_field_name_2}}'
    },
    fields: {
      type: 'array',
      items: {
        $ref: '#/schemas/templateField'
      }
    },
    date: {
      type: 'string',
      format: 'date',
      example: '2022-01-01T10:05:28.877Z'
    }
  }
}

export const templateFieldSchema = {
  type: 'object',
  required: ['name', 'required'],
  properties: {
    name: {
      type: 'string',
      example: 'any_name'
    },
    required: {
      type: 'boolean',
      example: true
    },
    defaultValue: {
      type: 'string',
      example: 'any_default_value'
    }
  }
}

export const addTemplateParamsSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      example: 'any_name'
    },
    text: {
      type: 'string',
      example: 'any_text: {{any_field_name_2}}'
    },
    fields: {
      type: 'array',
      items: {
        $ref: '#/schemas/templateField'
      }
    }
  }
}
