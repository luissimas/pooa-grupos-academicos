import { IHttpMiddleware } from '@http'
import { JwtAuthService } from '@infra/auth/jwtAuthService'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import { AuthMiddleware } from '@middlewares/auth'

export class AuthMiddlewareFactory {
  createMiddleware(): IHttpMiddleware {
    const authService = new JwtAuthService()
    const userRepository = MemoryUserRepository.getInstance()

    const authMiddleware = new AuthMiddleware(authService, userRepository)

    return authMiddleware
  }
}
