import { User } from '@entities/user'

export interface IUserRepository {
  create: (user: User) => Promise<void>
  list: () => Promise<User[]>
  getById: (id: string) => Promise<User | undefined>
  getByEmail: (email: string) => Promise<User | undefined>
}
