import { InvalidFieldError } from '@errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import { ILoginUsecase, LoginUsecaseResult } from '@usecases/auth/loginUsecase'

export class LoginController implements IHttpController {
  constructor(private readonly loginUsecase: ILoginUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<LoginUsecaseResult>> {
    const email = request.body?.email
    const password = request.body?.password

    if (!email) throw new InvalidFieldError('email', 'email is required')
    if (!password) throw new InvalidFieldError('password', 'password is required')

    const token = await this.loginUsecase.execute({ email, password })
    return {
      status: 200,
      data: token,
    }
  }
}
