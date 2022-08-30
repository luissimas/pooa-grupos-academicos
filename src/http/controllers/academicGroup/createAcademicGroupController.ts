import {
  CreateAcademicGroupUsecaseResult,
  ICreateAcademicGroupUsecase,
} from '@usecases/academicGroup/createAcademicGroupUsecase'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import { ForbiddenError, InvalidFieldError } from '@errors'
import Joi from 'joi'

export class CreateAcademicGroupController implements IHttpController {
  constructor(private readonly createAcademicGroupUsecase: ICreateAcademicGroupUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<CreateAcademicGroupUsecaseResult>> {
    if (!request.body) throw new InvalidFieldError('body')
    const params = this.validateBody(request.body)
    const user = request.context?.user

    if (params.error) throw new InvalidFieldError(params.error.message)
    if (!user) throw new ForbiddenError()

    const id = await this.createAcademicGroupUsecase.execute({
      data: {
        ...params.value,
        foundationDate: new Date(params.value.foundationDate),
      },
      user,
    })
    return {
      status: 201,
      data: id,
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        name: Joi.string().required(),
        description: Joi.string().required(),
        foundationDate: Joi.string().isoDate(),
        department: Joi.object()
          .keys({
            name: Joi.string().required(),
            abbreviation: Joi.string().required(),
          })
          .required(),
        sponsorId: Joi.string().uuid().required(),
        members: Joi.array().items(Joi.string().uuid().required()),
        maxMembers: Joi.number().positive().required(),
      })
      .validate(body)
  }
}
