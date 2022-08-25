import { Usuario } from '@entities/usuario'
import { IUserRepository } from '@repositories/userRepository'

export class MemoryUserRepository implements IUserRepository {
  private static users: Usuario[] = []

  async create(user: Usuario): Promise<void> {
    MemoryUserRepository.users = [...MemoryUserRepository.users, user]
  }
  async list(): Promise<Usuario[]> {
    return MemoryUserRepository.users
  }
  async getById(id: string): Promise<Usuario | undefined> {
    return MemoryUserRepository.users.find(user => user.id === id)
  }
  async getByEmail(email: string): Promise<Usuario | undefined> {
    return MemoryUserRepository.users.find(user => user.email === email)
  }
}
