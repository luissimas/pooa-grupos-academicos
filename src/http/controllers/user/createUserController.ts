import { InvalidFieldError } from '@errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import { CreateUserUsecaseResult, ICreateUserUsecase } from '@usecases/user/createUserUsecase'
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
        password: Joi.string().min(6).required(),
        name: Joi.string().required(),
        age: Joi.number().positive().required(),
        role: Joi.string()
          .pattern(/^student$|^professor$/)
          .required(),
        ra: Joi.when('role', { is: 'student', then: Joi.number().required() }),
        ira: Joi.when('role', { is: 'student', then: Joi.number().required() }),
        semester: Joi.when('role', { is: 'student', then: Joi.number().required() }),
        course: Joi.when('role', {
          is: 'student',
          then: Joi.object()
            .keys({
              name: Joi.string().required(),
              abbreviation: Joi.string().required(),
            })
            .required(),
        }),
        researchField: Joi.when('role', { is: 'professor', then: Joi.string().required() }),
        colegiatedBody: Joi.when('role', { is: 'professor', then: Joi.string().required() }),
      })
      .validate(body)
  }
}
