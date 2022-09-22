import { InvalidFieldError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import { IListAcademicGroupsUsecase, ListAcademicGroupsResult } from '@usecases/academicGroup/listAcademicGroupsUsecase'
import Joi from 'joi'

export class ListAcademicGroupsController implements IHttpController {
  constructor(private readonly listAcademicGroupsUsecase: IListAcademicGroupsUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ListAcademicGroupsResult>> {
    const { error, value } = this.validateQuery(request.query)

    if (error) throw new InvalidFieldError(error.details[0].path[0] as string, error.details[0].message)

    const result = await this.listAcademicGroupsUsecase.execute(value)
    return {
      status: 200,
      data: result,
    }
  }

  private validateQuery(query: any) {
    return Joi.object()
      .keys({
        name: Joi.string(),
      })
      .validate(query)
  }
}
