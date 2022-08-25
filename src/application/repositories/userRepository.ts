import { Usuario } from '@entities/usuario'

export interface IUserRepository {
  create: (user: Usuario) => Promise<void>
  list: () => Promise<Usuario[]>
  getById: (id: string) => Promise<Usuario | undefined>
  getByEmail: (email: string) => Promise<Usuario | undefined>
}
