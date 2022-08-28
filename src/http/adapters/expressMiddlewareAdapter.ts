import { NextFunction, Request, Response } from 'express'
import { HttpRequest, IHttpMiddleware } from '@http'

export const adaptMiddleware = (middleware: IHttpMiddleware) => {
  return async (expressRequest: Request, _expressResponse: Response, expressNext: NextFunction) => {
    const request: HttpRequest = {
      body: expressRequest.body,
      headers: expressRequest.headers,
      params: expressRequest.params,
      query: expressRequest.query,
      context: expressRequest.context,
    }

    try {
      const context = await middleware.handle(request)
      expressRequest.context = context

      return expressNext()
    } catch (error) {
      return expressNext(error)
    }
  }
}
