import { InternalServerError } from '@/presentation/errors'
import { Request, Response, NextFunction } from 'express'

interface ErrorType {
  message: string
  name: string
  stack?: string
  statusCode?: number
}

export const errorHandler = (error: ErrorType, req: Request, res: Response, next: NextFunction): void => {
  const { message } = error
  const statusCode = error.statusCode ?? 500
  res.status(statusCode).send({
    error: error.statusCode ? message : new InternalServerError().message,
    statusCode,
    success: false
  })
}
