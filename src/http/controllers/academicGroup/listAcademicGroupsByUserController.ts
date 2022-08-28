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
    const params = this.validateParams(request.params)

    if (params.error) throw new InvalidFieldError(params.error.message)

    const result = await this.listAcademicGroupsByUserUsecase.execute(request.params)
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
