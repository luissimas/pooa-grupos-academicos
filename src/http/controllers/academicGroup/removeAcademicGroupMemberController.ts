import { IRemoveAcademicGroupMemberUsecase } from '@application/usecases/academicGroup/removeAcademicGroupMemberUsecase'
import { InvalidFieldError, UnauthorizedError } from '@domain/errors'
import { IHttpController, HttpRequest, HttpResponse } from '@http'
import Joi from 'joi'

export class RemoveAcademicGroupMemberController implements IHttpController {
  constructor(private readonly RemoveAcademicGroupMemberUsecase: IRemoveAcademicGroupMemberUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const paramsValidation = this.validateParams(request.params)

    if (paramsValidation.error) {
      const error = paramsValidation.error
      throw new InvalidFieldError(error!.details[0].path[0] as string, error!.details[0].message)
    }

    if (!request.context?.user) throw new UnauthorizedError()

    const params = {
      ...paramsValidation.value,
      user: request.context.user,
    }

    await this.RemoveAcademicGroupMemberUsecase.execute(params)

    return {
      status: 204,
    }
  }

  private validateParams(params: any) {
    return Joi.object()
      .keys({
        memberId: Joi.string().uuid().required(),
        academicGroupId: Joi.string().uuid().required(),
      })
      .validate(params)
  }
}
