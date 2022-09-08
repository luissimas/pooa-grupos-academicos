import { IPasswordService } from 'application/services/password'
import { compare, hash } from 'bcrypt'

export class BcryptPasswordService implements IPasswordService {
  private static instance: BcryptPasswordService

  private constructor() {}

  public static getInstance(): BcryptPasswordService {
    if (!BcryptPasswordService.instance) BcryptPasswordService.instance = new BcryptPasswordService()

    return BcryptPasswordService.instance
  }

  async hashPassword(password: string): Promise<string> {
    return hash(password, 12)
  }

  async checkPassword(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword)
  }
}
