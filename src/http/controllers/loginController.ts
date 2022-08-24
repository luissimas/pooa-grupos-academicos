import { InvalidFieldError } from '@errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import { LoginUsecase } from 'application/usecase/user/loginUsecase'

export class LoginController implements IHttpController {
  constructor(private readonly loginUsecase: LoginUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<any>> {
    const email = request.body?.email
    const password = request.body?.password

    if (!email) throw new InvalidFieldError('Email', 'email obrigatório')
    if (!password) throw new InvalidFieldError('Senha', 'senha obrigatória')

    const token = await this.loginUsecase.execute({ email, password })
    return {
      status: 200,
      data: token,
    }
  }
}
