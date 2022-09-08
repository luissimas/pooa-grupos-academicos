import { Professor } from '@domain/entities/professor'
import { UserRoleEnum } from '@domain/entities/user'
import { AcademicGroup, AcademicGroupStatusEnum } from '@entities/academicGroup'
import { IAcademicGroupRepository } from '@repositories/academicGroupRepository'

export class MemoryAcademicGroupRepository implements IAcademicGroupRepository {
  private static instance: MemoryAcademicGroupRepository

  private static academicGroups: AcademicGroup[] = [
    {
      id: 'd5ebc700-a4be-41c2-9a49-48d1ba346a10',
      department: {
        id: '684e26bf-b73a-4c0b-9967-5d806d41397f',
        name: 'Departamento de Computação',
        abbreviation: 'DC',
      },
      name: 'CATI Jr',
      description: 'Empresa júnior de computação da UFSCar',
      foundationDate: new Date('1993-07-01'),
      status: AcademicGroupStatusEnum.Active,
      invitedEvents: [],
      promotedEvents: [],
      maxMembers: 60,
      members: [
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
      recruitmentProcesses: [
        {
          id: '60dfe536-6756-495f-aedc-5da07f61a93e',
          date: new Date('2022-08-02'),
          enrolled: 60,
          openings: 20,
          entrants: 20,
          stages: 3,
        },
      ],
      sponsor: {
        id: '753d4f0c-daff-4048-9bd9-d1da5131ecc5',
        age: 46,
        email: 'ana@hotmail.com',
        name: 'Ana Sales',
        password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
        role: UserRoleEnum.Professor,
        collegiateBody: 'Conselho Universitário',
        researchField: 'Compiladores',
      } as Professor,
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
      } as Professor,
    },
    {
      id: '25b982ce-3914-4a71-84e3-97e6308bfbc8',
      department: {
        id: '684e26bf-b73a-4c0b-9967-5d806d41397f',
        name: 'Departamento de Computação',
        abbreviation: 'DC',
      },
      name: 'GAMso',
      description: 'Honk!',
      foundationDate: new Date('2019-08-05'),
      status: AcademicGroupStatusEnum.Active,
      invitedEvents: [],
      promotedEvents: [],
      maxMembers: 15,
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
      } as Professor,
    },
  ]

  private constructor() {}

  public static getInstance(): MemoryAcademicGroupRepository {
    if (!MemoryAcademicGroupRepository.instance)
      MemoryAcademicGroupRepository.instance = new MemoryAcademicGroupRepository()

    return MemoryAcademicGroupRepository.instance
  }

  async create(academicGroup: AcademicGroup): Promise<void> {
    MemoryAcademicGroupRepository.academicGroups = [...MemoryAcademicGroupRepository.academicGroups, academicGroup]
  }

  async list(): Promise<AcademicGroup[]> {
    return MemoryAcademicGroupRepository.academicGroups
  }

  async getById(id: string): Promise<AcademicGroup | undefined> {
    return MemoryAcademicGroupRepository.academicGroups.find(group => group.id === id)
  }

  async getByUser(idUser: string): Promise<AcademicGroup[]> {
    return MemoryAcademicGroupRepository.academicGroups.filter(
      group => group.sponsor.id === idUser || group.members.filter(member => member.id === idUser).length > 0
    )
  }

  async update(academicGroup: AcademicGroup): Promise<void> {
    const index = MemoryAcademicGroupRepository.academicGroups.findIndex(group => group.id === academicGroup.id)

    MemoryAcademicGroupRepository.academicGroups[index] = academicGroup
  }
}
