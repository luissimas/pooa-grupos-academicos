import { Event } from '@entities/event'

export interface IEventRepository {
  create: (event: Event) => Promise<void>
  listByAcademicGroup: (academicGroupId: string) => Promise<Event[]>
  update: (event: Event) => Promise<void>
}
