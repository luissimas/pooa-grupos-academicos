import { EntityNotFound, UnauthorizedError } from '@errors'
import { HttpRequest, IHttpMiddleware } from '@http'
import { IUserRepository } from '@repositories/userRepository'
import { IAuthService } from 'application/services/auth'

export class AuthMiddleware implements IHttpMiddleware {
  constructor(private readonly authService: IAuthService, private readonly userRepository: IUserRepository) {}

  async handle(request: HttpRequest): Promise<HttpRequest['context']> {
    const token = request.headers['Authorization'] || request.headers['authorization']
    if (!token || !token.includes('Bearer ')) throw new UnauthorizedError('invalid token')

    const parsedToken = token.replace('Bearer ', '')
    const valid = await this.authService.validateToken(parsedToken)

    if (!valid) throw new UnauthorizedError('invalid token')

    const { userId } = await this.authService.decodeToken(parsedToken)
    const user = await this.userRepository.getById(userId)

    if (!user) throw new EntityNotFound('user')

    return {
      user,
    }
  }
}
