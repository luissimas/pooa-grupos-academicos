import {
  IListAcademicGroupsByUserUsecase,
  ListAcademicGroupsByUserResult,
} from '@application/usecases/academicGroup/listAcademicGroupsByUserUsecase'
import { InvalidFieldError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class ListAcademicGroupsByUserController implements IHttpController {
  constructor(private readonly listAcademicGroupsByUserUsecase: IListAcademicGroupsByUserUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ListAcademicGroupsByUserResult>> {
    const { error, value } = this.validateParams(request.params)

    if (error) throw new InvalidFieldError(error.details[0].path[0] as string, error.details[0].message)

    const result = await this.listAcademicGroupsByUserUsecase.execute(value)
    return {
      status: 200,
      data: result,
    }
  }

  private validateParams(params: any) {
    return Joi.object()
      .keys({
        userId: Joi.string().uuid().required(),
      })
      .validate(params)
  }
}
