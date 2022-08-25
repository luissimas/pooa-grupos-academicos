import { IHttpMiddleware } from '@http'
import { AuthMiddleware } from '@middlewares/auth'
import { JwtAuthService } from 'infra/auth/jwtAuthService'
import { MemoryUserRepository } from 'infra/repositories/user/memoryUserRepository'

export class AuthMiddlewareFactory {
  createMiddleware(): IHttpMiddleware {
    const authService = new JwtAuthService()
    const userRepository = new MemoryUserRepository()

    const authMiddleware = new AuthMiddleware(authService, userRepository)

    return authMiddleware
  }
}
