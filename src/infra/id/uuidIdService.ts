import { v4 as uuid } from 'uuid'
import { IIdService } from 'application/services/id'

export class UuidIdService implements IIdService {
  generate() {
    return uuid()
  }
}
