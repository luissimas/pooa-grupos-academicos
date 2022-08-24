import { Usuario } from '@entities/usuario'

export interface IUserRepository {
  list: () => Promise<Usuario[]>
  getById: (id: string) => Promise<Usuario | null>
  getByEmail: (email: string) => Promise<Usuario | null>
}
