import { IUpdateAcademicGroupSponsorUsecase } from '@application/usecases/academicGroup/updateAcademicGroupSponsorUsecase'
import { InvalidFieldError, UnauthorizedError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class UpdateAcademicGroupSponsorController implements IHttpController {
  constructor(private readonly updateAcademicGroupSponsorUsecase: IUpdateAcademicGroupSponsorUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const bodyValidation = this.validateBody(request.body)
    const paramsValidation = this.validateParams(request.params)

    if (bodyValidation.error || paramsValidation.error) {
      const error = bodyValidation.error || paramsValidation.error
      throw new InvalidFieldError(error!.details[0].path[0] as string, error!.details[0].message)
    }

    if (!request.context?.user) throw new UnauthorizedError()

    const params = {
      user: request.context.user,
      ...bodyValidation.value,
      ...paramsValidation.value,
    }

    await this.updateAcademicGroupSponsorUsecase.execute(params)

    return {
      status: 204,
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        sponsorId: Joi.string().uuid().required(),
      })
      .validate(body)
  }

  private validateParams(params: any) {
    return Joi.object()
      .keys({
        academicGroupId: Joi.string().uuid().required(),
      })
      .validate(params)
  }
}
