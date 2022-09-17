import { JwtAuthService } from '@infra/auth/jwtAuthService'
import { BcryptPasswordService } from '@infra/password/bcryptPasswordService'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import { ILoginUsecase, LoginUsecase } from '@usecases/auth/loginUsecase'

export abstract class LoginUsecaseFactory {
  static createUsecase(): ILoginUsecase {
    const userRepository = MemoryUserRepository.getInstance()
    const passwordService = BcryptPasswordService.getInstance()
    const authService = JwtAuthService.getInstance()

    const loginUsecase = new LoginUsecase(userRepository, passwordService, authService)

    return loginUsecase
  }
}
