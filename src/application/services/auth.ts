export type TokenPayload = {
  userId: string
}

export interface IAuthService {
  generateToken: (payload: TokenPayload) => Promise<string>
  validateToken: (token: string) => Promise<boolean>
  decodeToken: (token: string) => Promise<TokenPayload>
}
