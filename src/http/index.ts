import { User } from '@entities/user'
import { BaseError } from '@errors/baseError'

export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  query?: any
  context?: {
    user?: User
  }
}

export type HttpResponse<T> = {
  status: number
  headers?: Record<string, string>
  data?: T
}

export interface IHttpController {
  handle: (request: HttpRequest) => Promise<HttpResponse<any>>
}

export interface IHttpMiddleware {
  handle: (request: HttpRequest) => Promise<HttpRequest['context']>
}

export interface IHttpErrorHandler {
  handle: (error: BaseError) => HttpResponse<any>
}
