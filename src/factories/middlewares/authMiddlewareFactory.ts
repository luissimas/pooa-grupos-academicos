import { IHttpMiddleware } from '@http'
import { JwtAuthService } from '@infra/auth/jwtAuthService'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import { AuthMiddleware } from '@middlewares/auth'

export abstract class AuthMiddlewareFactory {
  static createMiddleware(): IHttpMiddleware {
    const authService = JwtAuthService.getInstance()
    const userRepository = MemoryUserRepository.getInstance()

    const authMiddleware = new AuthMiddleware(authService, userRepository)

    return authMiddleware
  }
}
