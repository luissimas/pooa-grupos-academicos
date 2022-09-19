import { Event } from '@entities/Event'

export interface IEventRepository {
  create: (event: Event) => Promise<void>
  list: () => Promise<Event[]>
  getById: (id: string) => Promise<Event | undefined>
  getByUser: (idEvent: string) => Promise<Event[]>
  update: (event: Event) => Promise<void>
}
