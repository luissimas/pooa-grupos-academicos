import { v4 as uuid } from 'uuid'
import { IIdService } from 'application/services/id'

export class UuidIdService implements IIdService {
  private static instance: UuidIdService

  private constructor() {}

  public static getInstance(): UuidIdService {
    if (!UuidIdService.instance) UuidIdService.instance = new UuidIdService()

    return UuidIdService.instance
  }

  generate() {
    return uuid()
  }
}
