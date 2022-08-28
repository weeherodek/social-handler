import { Request, Response, NextFunction } from 'express'

export const errorHandler = (error: any, req: Request, res: Response, next: NextFunction): void => {
  const { message } = error
  res.status(error.statusCode ?? 500).send({
    error: message.length ? message : 'Internal Server Error'
  })
}
