import { IDisableAcademicGroupUsecase } from '@application/usecases/academicGroup/disableAcademicGroupUsecase'
import { InvalidFieldError, UnauthorizedError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class DisableAcademicGroupController implements IHttpController {
  constructor(private readonly disableAcademicGroupUsecase: IDisableAcademicGroupUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const paramsValidation = this.validateParams(request.params)

    if (paramsValidation.error) {
      const error = paramsValidation.error
      throw new InvalidFieldError(error!.details[0].path[0] as string, error!.details[0].message)
    }

    if (!request.context?.user) throw new UnauthorizedError('')

    await this.disableAcademicGroupUsecase.execute({
      academicGroupId: request.params.academicGroupId,
      user: request.context.user,
    })
    return {
      status: 204,
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
