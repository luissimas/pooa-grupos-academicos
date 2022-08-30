import { BaseError } from './baseError'

export class UserAlreadyExists extends BaseError {
  constructor(field: string, value: string, public readonly details?: string) {
    super(`User with ${field} "${value}" already exists.`, details)
  }
}

export class EntityNotFound extends BaseError {
  constructor(public readonly entity: string, public readonly details?: string) {
    super(`Entity ${entity} not found.`, details)
  }
}

export class InvalidFieldError extends BaseError {
  constructor(field: string, public readonly details?: string) {
    super(`Invalid field "${field}".`, details)
  }
}

export class UnauthorizedError extends BaseError {
  constructor(message: string) {
    super(message)
  }
}

export class ForbiddenError extends BaseError {
  constructor() {
    super('')
  }
}

export class BusinessLogicError extends BaseError {
  constructor(message: string) {
    super(message)
  }
}
