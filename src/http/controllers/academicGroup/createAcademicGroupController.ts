import { CreateAcademicGroupUsecaseResult, ICreateAcademicGroupUsecase } from "@usecases/academicGroup/createAcademicGroupUsecase"
import { HttpRequest, HttpResponse, IHttpController } from "@http"
import { InvalidFieldError } from "@errors"
import Joi from "joi"

export class CreateAcademicGroupController implements IHttpController {
  constructor(private readonly createAcademicGroupUsecase: ICreateAcademicGroupUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<CreateAcademicGroupUsecaseResult>> {
    if (!request.body) throw new InvalidFieldError('body')
    const params = this.validateBody(request.body)

    if (params.error) throw new InvalidFieldError(params.error.message)

    const id = await this.createAcademicGroupUsecase.execute(params.value)
    return {
      status: 201,
      data: id
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        // TODO: Implementar
      })
      .validate(body)
  }
}
