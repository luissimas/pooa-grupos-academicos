import { BaseError } from './baseError'

export class UserAlreadyExists extends BaseError {
  constructor(value: string, field: string, public readonly details?: string) {
    super(`User with ${field} "${value}" already exists.`, details)
  }
}

export class EntityNotFound extends BaseError {
  constructor(public readonly entity: string, public readonly details?: string) {
    super(`${entity} not found.`, details)
  }
}

export class InvalidFieldError extends BaseError {
  constructor(field: string, public readonly details?: string) {
    super(`Field "${field}" is invalid.`, details)
  }
}
