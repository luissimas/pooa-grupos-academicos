import { UnauthorizedError } from '@errors'
import { EntityNotFound } from '@errors'
import { IUserRepository } from '@repositories/userRepository'
import { IAuthService } from 'application/services/auth'
import { IPasswordService } from 'application/services/password'

type LoginUsecaseParams = {
  email: string
  password: string
}

type LoginUsecaseResult = {
  token: string
}

export interface ILoginUsecase {
  execute: (params: LoginUsecaseParams) => Promise<LoginUsecaseResult>
}

export class LoginUsecase implements ILoginUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly passwordService: IPasswordService,
    private readonly authService: IAuthService
  ) {}

  async execute(params: LoginUsecaseParams): Promise<LoginUsecaseResult> {
    const user = await this.userRepository.getByEmail(params.email)
    if (!user) throw new EntityNotFound('usuário')

    const passwordMatch = await this.passwordService.checkPassword(params.password, user.senha)
    if (!passwordMatch) throw new UnauthorizedError('Credenciais inválidas')

    const token = await this.authService.generateToken({ userId: user.id })

    return { token }
  }
}
