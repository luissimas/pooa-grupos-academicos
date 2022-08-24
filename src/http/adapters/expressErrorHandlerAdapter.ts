import { NextFunction, Request, Response } from 'express'
import { IHttpErrorHandler } from '@http'
import { BaseError } from '@errors/baseError'

export const adaptErrorHandler = (handler: IHttpErrorHandler) => {
  return async (error: BaseError, _expressRequest: Request, expressResponse: Response, _expressNext: NextFunction) => {
    const { status, data } = handler.handle(error)

    return expressResponse.status(status).json(data)
  }
}
