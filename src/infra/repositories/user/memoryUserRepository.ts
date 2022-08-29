import { Professor } from '@domain/entities/professor'
import { Student } from '@domain/entities/student'
import { User, UserRoleEnum } from '@entities/user'
import { IUserRepository } from '@repositories/userRepository'

export class MemoryUserRepository implements IUserRepository {
  private static users: User[] = [
    {
      id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      age: 24,
      email: 'joaquim@hotmail.com',
      name: 'Joaquim Silva',
      password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
      role: UserRoleEnum.Student,
      ra: 11891,
      ira: 18000,
      semester: 7,
      course: {
        id: '1fc8c9cb-7203-4d5a-9f47-0abc8cc14e28',
        abbreviation: 'BCC',
        name: 'Bacharelado em Ciência da Computação',
      },
    } as Student,
    {
      id: '753d4f0c-daff-4048-9bd9-d1da5131ecc5',
      age: 46,
      email: 'ana@hotmail.com',
      name: 'Ana Sales',
      password: '$2b$12$2QRGtU0.p8fdfb5Vhog9jeyQwep35tx59mxm3mH8u8hlfe6wpHO6q',
      role: UserRoleEnum.Professor,
      collegiateBody: 'Conselho Universitário',
      researchField: 'Compiladores',
    } as Professor,
  ]

  async create(user: User): Promise<void> {
    MemoryUserRepository.users = [...MemoryUserRepository.users, user]
  }
  async list(): Promise<User[]> {
    return MemoryUserRepository.users
  }
  async getById(id: string): Promise<User | undefined> {
    return MemoryUserRepository.users.find(user => user.id === id)
  }
  async getByEmail(email: string): Promise<User | undefined> {
    return MemoryUserRepository.users.find(user => user.email === email)
  }
}
