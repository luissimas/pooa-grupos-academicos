import {
  IListAcademicGroupMembersUsecase,
  listAcademicGroupMembersUsecaseResult,
} from '@application/usecases/academicGroup/listAcademicGroupMembersUsecase'
import { InvalidFieldError } from '@domain/errors'
import { HttpRequest } from '@http'
import { IHttpController } from '@http'
import { HttpResponse } from '@http'
import Joi from 'joi'

export class listAcademicGroupMembersController implements IHttpController {
  constructor(private readonly listAcademicGroupMembersUsecase: IListAcademicGroupMembersUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<listAcademicGroupMembersUsecaseResult>> {
    const { error, value } = this.validateParams(request.params)

    // este erro eh de fato um erro de campo invalido?
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
        groupId: Joi.string().uuid().required(),
      })
      .validate(params)
  }
}
