import { Student } from '@domain/entities/student'
import { Event, EventStatusEnum } from '@domain/entities/event'
import { UserRoleEnum } from '@domain/entities/user'
import { AcademicGroup, AcademicGroupStatusEnum } from '@entities/academicGroup'
import { IEventRepository } from '@repositories/eventRepository'

export class MemoryEventRepository implements IEventRepository {
  private static instance: MemoryEventRepository

  private static events: Event[] = [
    {
      id: 'd5ebc700-a4be-41c2-9a49-48d1ba346a10',
      name: 'Secomp',
      date: 'CATI Jr',
      status: EventStatusEnum.Future,
      location: 'a',
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
      ] as Student,
    },
    {
      id: 'ea68898c-ea06-43ab-85db-463dbb05fbb4',
      department: {
        id: '684e26bf-b73a-4c0b-9967-5d806d41397f',
        name: 'Departamento de Computação',
        abbreviation: 'DC',
      },
      name: 'PET-BCC',
      description: 'PET do curso de bacharelado em ciência da computação da UFSCar',
      foundationDate: new Date('2002-03-16'),
      status: AcademicGroupStatusEnum.Active,
      invitedEvents: [],
      promotedEvents: [],
      maxMembers: 20,
      members: [
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
      recruitmentProcesses: [],
      sponsor: {
        id: '753d4f0c-daff-4048-9bd9-d1da5131ecc5',
        age: 46,
        email: 'ana@hotmail.com',
        name: 'Ana Sales',
        password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
        role: UserRoleEnum.Professor,
        collegiateBody: 'Conselho Universitário',
        researchField: 'Compiladores',
      },
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
  /*
  async getByAcademicGroup(idAcademicGroup: string): Promise<Event[]> {
    return MemoryEventRepository.events.filter(
      event => event.sponsor.id === idUser || group.members.filter(member => member.id === idUser).length > 0
    )
  }

  async update(academicGroup: AcademicGroup): Promise<void> {
    const index = MemoryAcademicGroupRepository.academicGroups.findIndex(group => group.id === academicGroup.id)

    MemoryAcademicGroupRepository.academicGroups[index] = academicGroup
  }*/

}
