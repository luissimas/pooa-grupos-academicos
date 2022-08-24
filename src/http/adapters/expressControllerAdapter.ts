import { NextFunction, Request, Response } from 'express'
import { HttpRequest, IHttpController } from '@http'

export const adaptController = (controller: IHttpController) => {
  return async (expressRequest: Request, expressResponse: Response, expressNext: NextFunction) => {
    const request: HttpRequest = {
      body: expressRequest.body,
      headers: expressRequest.headers,
      params: expressRequest.params,
      query: expressRequest.query,
      context: expressRequest.context,
    }

    try {
      const { status, headers, data } = await controller.handle(request)
      // TODO: handle headers

      return expressResponse.status(status).send(data)
    } catch (error) {
      return expressNext(error)
    }
  }
}
