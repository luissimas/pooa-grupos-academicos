import { User } from '@entities/user'
import { IUserRepository } from '@repositories/userRepository'

export class MemoryUserRepository implements IUserRepository {
  private static users: User[] = []

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
