import { UnauthorizedError } from '@errors'
import { IAuthService, TokenPayload } from 'application/services/auth'
import { sign, verify, decode } from 'jsonwebtoken'

export class JwtAuthService implements IAuthService {
  async generateToken(payload: TokenPayload): Promise<string> {
    if (!process.env.PRIVATE_AUTH_KEY) throw new Error('Private auth key not found')

    const privateKey = process.env.PRIVATE_AUTH_KEY.replace(/\\n/g, '\n')

    return sign(payload, privateKey, { expiresIn: '1h', algorithm: 'RS256' })
  }

  async validateToken(token: string): Promise<boolean> {
    try {
      if (!process.env.PUBLIC_AUTH_KEY) throw new Error('Public auth key not found')

      const publicKey = process.env.PUBLIC_AUTH_KEY.replace(/\\n/g, '\n')

      verify(token, publicKey)
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
