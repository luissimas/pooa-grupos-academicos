import { InvalidFieldError } from '@errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import { CreateUserUsecaseResult, ICreateUserUsecase } from 'application/usecase/user/createUserUsecase'
import Joi from 'joi'

export class CreateUserController implements IHttpController {
  constructor(private readonly createUserUsecase: ICreateUserUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<CreateUserUsecaseResult>> {
    if (!request.body) throw new InvalidFieldError('body')
    const params = this.validateBody(request.body)

    if (params.error) throw new InvalidFieldError(params.error.message)

    const id = await this.createUserUsecase.execute(params.value)
    return {
      status: 201,
      data: id,
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        email: Joi.string().email().required(),
        senha: Joi.string().min(6).required(),
        nome: Joi.string().required(),
        idade: Joi.number().positive().required(),
        tipo: Joi.string()
          .pattern(/^aluno$|^professor$/)
          .required(),
        ra: Joi.when('tipo', { is: 'aluno', then: Joi.number().required() }),
        ira: Joi.when('tipo', { is: 'aluno', then: Joi.number().required() }),
        semestre: Joi.when('tipo', { is: 'aluno', then: Joi.number().required() }),
        curso: Joi.when('tipo', {
          is: 'aluno',
          then: Joi.object()
            .keys({
              nome: Joi.string().required(),
              sigla: Joi.string().required(),
            })
            .required(),
        }),
        linhaPesquisa: Joi.when('tipo', { is: 'professor', then: Joi.string().required() }),
        orgaoColegiado: Joi.when('tipo', { is: 'professor', then: Joi.string().required() }),
      })
      .validate(body)
  }
}
