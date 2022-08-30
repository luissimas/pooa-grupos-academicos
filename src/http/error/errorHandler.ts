import { BaseError } from '@errors/baseError'
import { HttpResponse, IHttpErrorHandler } from '@http'

type StatusAssoc = {
  [key: string]: number
}

const httpStatus: StatusAssoc = {
  EntityNotFound: 404,
  InvalidFieldError: 400,
  UnauthorizedError: 403,
  UserAlreadyExists: 409,
  BusinessLogicError: 409,
  // TODO: Map possible errors
}

export class HttpErrorHandler implements IHttpErrorHandler {
  handle(error: BaseError): HttpResponse<any> {
    const { message, details } = error

    const name = error.constructor.name
    const status = httpStatus[name] || 500

    // NOTE: Logging error for debugging
    console.log(error)

    if (status === 500) {
      return {
        status,
        data: {
          'Internal error': error.message,
        },
      }
    }

    return {
      status,
      data: {
        error: message,
        details: details,
      },
    }
  }
}
