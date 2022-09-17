import { Middleware } from '@/presentation/protocols/middleware'
import { NextFunction, Request, Response } from 'express'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const result = await middleware.handle({
      body: req.body,
      headers: req.headers as Record<string, string>
    })
    Object.assign(req, result.body.data)
    next()
  }
}
