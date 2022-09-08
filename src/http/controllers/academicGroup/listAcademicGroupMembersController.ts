import {
  IListAcademicGroupMembersUsecase,
  ListAcademicGroupMembersUsecaseResult,
} from '@application/usecases/academicGroup/listAcademicGroupMembersUsecase'
import { InvalidFieldError } from '@domain/errors'
import { HttpRequest } from '@http'
import { IHttpController } from '@http'
import { HttpResponse } from '@http'
import Joi from 'joi'

export class ListAcademicGroupMembersController implements IHttpController {
  constructor(private readonly listAcademicGroupMembersUsecase: IListAcademicGroupMembersUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ListAcademicGroupMembersUsecaseResult>> {
    const { error, value } = this.validateParams(request.params)

    if (error) throw new InvalidFieldError(error.details[0].path[0] as string, error.details[0].message)

    const result = await this.listAcademicGroupMembersUsecase.execute(value)
    return {
      status: 200,
      data: result,
    }
  }

  private validateParams(params: any) {
    return Joi.object()
      .keys({
        academicGroupId: Joi.string().uuid().required(),
      })
      .validate(params)
  }
}
