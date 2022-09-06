import { Controller } from '@/presentation/protocols/controller'
import { Request, Response } from 'express'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const result = await controller.handle({
      body: req.body
    })
    res.status(result.statusCode).send(result.body)
  }
}
