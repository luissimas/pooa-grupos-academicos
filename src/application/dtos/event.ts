import { StudentDTO } from '@dtos/user'
import { EventStatusEnum } from '@domain/entities/event'
import { LocationDTO } from '@dtos/location'

export interface EventDTO {
  id: string
  name: string
  date: Date
  promoters: StudentDTO[]
  status: EventStatusEnum
  location: LocationDTO
  speakers: string[]
}
