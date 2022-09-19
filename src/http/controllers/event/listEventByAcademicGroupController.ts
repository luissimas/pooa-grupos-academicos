import {
  IListEventByAcademicGroupUsecase,
  ListEventByAcademicGroupResult,
} from '@application/usecases/event/listEventByAcademicGroupUsecase'
import { InvalidFieldError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class ListEventByAcademicGroupController implements IHttpController {
  constructor(private readonly listEventByAcademicGroupUsecase: IListEventByAcademicGroupUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ListEventByAcademicGroupResult>> {
    const { error, value } = this.validateParams(request.params)

    if (error) throw new InvalidFieldError(error.details[0].path[0] as string, error.details[0].message)

    const result = await this.listEventByAcademicGroupUsecase.execute(value)
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
