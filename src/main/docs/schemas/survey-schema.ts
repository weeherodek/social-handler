export const surveySchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      example: 'any_id'
    },
    question: {
      type: 'string',
      example: 'any_question'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    },
    didAnswer: {
      type: 'boolean',
      example: true
    },
    date: {
      type: 'date',
      example: '2022-01-01T10:05:28.877Z'
    }
  }
}

export const surveysSchema = {
  type: 'array',
  items: {
    $ref: '#/schemas/survey'
  }
}

export const surveyAnswerSchema = {
  type: 'object',
  required: ['answer'],
  properties: {
    answer: {
      type: 'string',
      example: 'any_answer'
    },
    image: {
      type: 'string',
      example: 'http://www.any_image.com'
    }
  }
}

export const addSurveyParamsSchema = {
  type: 'object',
  properties: {
    question: {
      type: 'string',
      example: 'any_question'
    },
    answers: {
      type: 'array',
      items: {
        $ref: '#/schemas/surveyAnswer'
      }
    }
  }
}

export const answerSurveyParamsSchema = {
  type: 'object',
  properties: {
    answer: {
      type: 'string',
      example: 'any_answer'
    }
  }
}

export const answerSurveyResultResponse = {
  type: 'object',
  properties: {
    surveyId: {
      type: 'string',
      example: 'any_id'
    },
    question: {
      type: 'string',
      example: 'any_question'
    },
    date: {
      type: 'string',
      format: 'date',
      example: '2022-01-01T10:05:28.877Z'
    },
    answers: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          answer: {
            type: 'string',
            example: 'any_answer'
          },
          image: {
            type: 'string',
            example: 'any_image'
          },
          count: {
            type: 'integer',
            example: 1
          },
          percent: {
            type: 'integer',
            minimum: 0,
            maximum: 100,
            example: 100
          },
          isCurrentAnswer: {
            type: 'boolean',
            example: true
          }
        }
      }
    }
  }
}
