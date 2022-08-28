import { StudentDTO } from '@dtos/user'
import { EventStatusEnum } from '@domain/entities/event'
import { AddressDTO } from '@dtos/address'

export interface EventDTO {
  id: string
  name: string
  date: Date
  promoters: StudentDTO[]
  status: EventStatusEnum
  location: AddressDTO
  speakers: string[]
}
