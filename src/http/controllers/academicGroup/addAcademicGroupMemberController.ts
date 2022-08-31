import { IAddAcademicGroupMemberUsecase } from '@application/usecases/academicGroup/addAcademicGroupMemberUsecase'
import { InvalidFieldError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class AddAcademicGroupMemberController implements IHttpController {
  constructor(private readonly addAcademicGroupMemberUsecase: IAddAcademicGroupMemberUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const bodyValidation = this.validateBody(request.body)
    const paramsValidation = this.validateParams(request.params)

    if (bodyValidation.error || paramsValidation.error) {
      const error = bodyValidation.error || paramsValidation.error
      throw new InvalidFieldError(error!.details[0].path[0] as string, error!.details[0].message)
    }

    const params = {
      ...bodyValidation.value,
      ...paramsValidation.value,
    }

    await this.addAcademicGroupMemberUsecase.execute(params)

    return {
      status: 204,
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        studentId: Joi.string().uuid().required(),
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
