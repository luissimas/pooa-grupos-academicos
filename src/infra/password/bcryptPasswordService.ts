import { IPasswordService } from 'application/services/password'
import { compare, hash } from 'bcrypt'

export class BcryptPasswordService implements IPasswordService {
  async hashPassword(password: string): Promise<string> {
    return hash(password, 12)
  }
  async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
