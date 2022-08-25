import { HttpRequest, HttpResponse, IHttpController } from '@http'
import {
  CreateUserUsecaseParams,
  CreateUserUsecaseResult,
  ICreateUserUsecase,
} from 'application/usecase/user/createUserUsecase'

export class CreateUserController implements IHttpController {
  constructor(private readonly createUserUsecase: ICreateUserUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<CreateUserUsecaseResult>> {
    const params: CreateUserUsecaseParams = {
      nome: request.body.nome,
      idade: request.body.idade,
      email: request.body.email,
      senha: request.body.senha,
      tipo: request.body.tipo,
      ra: request.body.ra,
      semestre: request.body.semestre,
      curso: request.body.curso,
      linhaPesquisa: request.body.linhaPesquisa,
      orgaoColegiado: request.body.orgaoColegiado,
    }

    const id = await this.createUserUsecase.execute(params)
    return {
      status: 201,
      data: id,
    }
  }
}
