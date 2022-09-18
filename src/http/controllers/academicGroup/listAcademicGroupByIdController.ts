import Joi from "joi"
import {
  IListAcademicGroupByIdUsecase,
  ListAcademicGroupByIdUsecaseResult
} from "@usecases/academicGroup/listAcademicGroupByIdUsecase"
import { HttpRequest, HttpResponse, IHttpController } from "@http"
import { InvalidFieldError } from "@errors"

export class ListAcademicGroupByIdController implements IHttpController {
  constructor(
    private readonly listAcademicGroupByIdUsecase: IListAcademicGroupByIdUsecase
  ) {}

  async handle(request: HttpRequest): Promise<HttpResponse<ListAcademicGroupByIdUsecaseResult>> {
    const { error, value } = this.validateParams(request.params)

    if (error) throw new InvalidFieldError(
      error.details[0].path[0] as string,
      error.details[0].message
    )

    const result = await this.listAcademicGroupByIdUsecase.execute(value)
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
