import { Usuario } from '@entities/usuario'

export type HttpRequest = {
  body?: any
  headers?: any
  params?: any
  query?: any
  context?: {
    user?: Usuario
  }
}

export type HttpResponse<T> = {
  status: number
  headers?: Record<string, string>
  data?: T
}

export interface IHttpController {
  handle: (httpRequest: HttpRequest) => Promise<HttpResponse<any>>
}

export interface IHttpMiddleware {
  handle: (httpRequest: HttpRequest) => Promise<HttpRequest['context']>
}
