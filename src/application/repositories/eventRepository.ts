import { Event } from '@entities/event'

export interface IEventRepository {
  create: (event: Event) => Promise<void>
  listByAcademicGroup: (academicGroupId: string) => Promise<Event[]>
  getById: (eventId: string) => Promise<Event | undefined>
  update: (event: Event) => Promise<void>
}
