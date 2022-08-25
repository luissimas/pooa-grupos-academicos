import { UnauthorizedError } from '@errors'
import { IAuthService, TokenPayload } from 'application/services/auth'
import { sign, verify, decode } from 'jsonwebtoken'

export class JwtAuthService implements IAuthService {
  async generateToken(payload: TokenPayload): Promise<string> {
    return sign(payload, 'SECRET', { expiresIn: '1h' })
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      verify(token, 'SECRET')
      return true
    } catch (error) {
      throw new UnauthorizedError('Token inválido')
    }
  }

  async decodeToken(token: string): Promise<TokenPayload> {
    const decoded = decode(token)

    if (!decoded || typeof decoded === 'string') throw new UnauthorizedError('Token inválido')

    return {
      userId: decoded.userId,
    }
  }
}
