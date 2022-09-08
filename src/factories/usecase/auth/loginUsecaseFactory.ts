import { JwtAuthService } from '@infra/auth/jwtAuthService'
import { BcryptPasswordService } from '@infra/password/bcryptPasswordService'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import { ILoginUsecase, LoginUsecase } from '@usecases/auth/loginUsecase'

export class LoginUsecaseFactory {
  createUsecase(): ILoginUsecase {
    const userRepository = MemoryUserRepository.getInstance()
    const passwordService = new BcryptPasswordService()
    const authService = new JwtAuthService()

    const loginUsecase = new LoginUsecase(userRepository, passwordService, authService)

    return loginUsecase
  }
}
