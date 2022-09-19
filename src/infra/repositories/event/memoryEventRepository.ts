import { Student } from '@domain/entities/student'
import { Event, EventStatusEnum } from '@domain/entities/event'
import { UserRoleEnum } from '@domain/entities/user'
import { IEventRepository } from '@repositories/eventRepository'

export class MemoryEventRepository implements IEventRepository {
  private static instance: MemoryEventRepository

  private static events: Event[] = [
    {
      id: '21da4g51-a4be-41c2-9a49-48d1ba346a10',
      name: 'Secomp',
      date: '2022-12-03',
      status: EventStatusEnum.Future,
      location: 'Avenida São Carlos, São Carlos - SP',
      academicGroupsPromoters: ['d5ebc700-a4be-41c2-9a49-48d1ba346a10','ea68898c-ea06-43ab-85db-463dbb05fbb4'],
      academicGroupsInvited: [],
      speakers: ['Linus Torvalds', 'Robert Cecil Martin'],
      promoters: [
        {
          id: '03dec7a5-9b4e-4d73-a87f-c00ff03d71b7',
          age: 21,
          email: 'amanda@hotmail.com',
          name: 'Amanda Moraes',
          password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
          role: UserRoleEnum.Student,
          ra: 17022,
          ira: 18999,
          semester: 4,
          course: {
            id: '1fc8c9cb-7203-4d5a-9f47-0abc8cc14e28',
            abbreviation: 'BCC',
            name: 'Bacharelado em Ciência da Computação',
          },
        },
      ],
    },
    {
      id: '6ahs8lg3-a4be-41c2-9a49-48d1ba346a10',
      name: 'Gamenight',
      date: '2019-10-03',
      status: EventStatusEnum.Canceled,
      location: 'Departamento de Computação, São Carlos - SP',
      academicGroupsPromoters: ['25b982ce-3914-4a71-84e3-97e6308bfbc8'],
      academicGroupsInvited: ['d5ebc700-a4be-41c2-9a49-48d1ba346a10', 'ea68898c-ea06-43ab-85db-463dbb05fbb4'],
      speakers: ['Mark Zuckerbeg', 'Harvey Smith'],
      promoters: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          age: 24,
          email: 'joaquim@hotmail.com',
          name: 'Joaquim Silva',
          password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
          role: UserRoleEnum.Student,
          ra: 11891,
          ira: 16312,
          semester: 7,
          course: {
            id: '1fc8c9cb-7203-4d5a-9f47-0abc8cc14e28',
            abbreviation: 'BCC',
            name: 'Bacharelado em Ciência da Computação',
          },
        },
      ],
    },
    {
      id: '5asdghel-a4be-41c2-9a49-48d1ba346a10',
      name: 'Workshop Integrativo',
      date: '2022-09-17',
      status: EventStatusEnum.Occuring,
      location: 'Departamento de Computação, São Carlos - SP',
      academicGroupsInvited: ['d5ebc700-a4be-41c2-9a49-48d1ba346a10'],
      academicGroupsPromoters: ['ea68898c-ea06-43ab-85db-463dbb05fbb4'],
      speakers: ['Silvio Santos', 'Luciano Hulk'],
      promoters: [
        {
          id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
          age: 24,
          email: 'joaquim@hotmail.com',
          name: 'Joaquim Silva',
          password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
          role: UserRoleEnum.Student,
          ra: 11891,
          ira: 16312,
          semester: 7,
          course: {
            id: '1fc8c9cb-7203-4d5a-9f47-0abc8cc14e28',
            abbreviation: 'BCC',
            name: 'Bacharelado em Ciência da Computação',
          },
        },
      ],
    },
  ]

  private constructor() {}

  public static getInstance(): MemoryEventRepository {
    if (!MemoryEventRepository.instance)
      MemoryEventRepository.instance = new MemoryEventRepository()

    return MemoryEventRepository.instance
  }

  async create(event: Event): Promise<void> {
    MemoryEventRepository.events = [...MemoryEventRepository.events, event]
  }

  async list(): Promise<Event[]> {
    return MemoryEventRepository.events
  }

  async getById(id: string): Promise<Event | undefined> {
    return MemoryEventRepository.events.find(event => event.id === id)
  }

  async getByAcademicGroup(idAcademicGroup: string): Promise<Event[]> {
    return MemoryEventRepository.events.filter(
      event => event.academicGroupsInvited.some(academicGroup => academicGroup.id === idAcademicGroup) || event.academicGroupsPromoters.some(academicGroup => academicGroup.id === idAcademicGroup)
    )
  }

  async update(event: Event): Promise<void> {
    const index = MemoryEventRepository.events.findIndex(existingEvent => existingEvent.id === event.id)

    MemoryEventRepository.events[index] = event
  }

}
