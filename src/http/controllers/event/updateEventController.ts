import { IUpdateEventUsecase } from '@application/usecases/event/updateEventUsecase'
import { InvalidFieldError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class UpdateEventController implements IHttpController {
  constructor(private readonly updateEventUsecase: IUpdateEventUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<void>> {
    const bodyValidation = this.validateBody(request.body)
    const paramsValidation = this.validateParams(request.params)

    if (bodyValidation.error || paramsValidation.error) {
      const error = bodyValidation.error || paramsValidation.error
      throw new InvalidFieldError(error!.details[0].path[0] as string, error!.details[0].message)
    }

    const params = {
      data: bodyValidation.value,
      eventId: paramsValidation.value.eventId,
    }

    await this.updateEventUsecase.execute(params)

    return {
      status: 204,
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        name: Joi.string(),
        date: Joi.string().isoDate(),
        status: Joi.string().pattern(/^future$|^occuring$|^canceled$/),
        speakers: Joi.array().items(Joi.string()),
        location: Joi.object().keys({
          street: Joi.string().required(),
          number: Joi.string().required(),
          district: Joi.string().required(),
          zipCode: Joi.string().required(),
          complement: Joi.string().required(),
          referencePoint: Joi.string().required(),
        }),
      })
      .validate(body)
  }

  private validateParams(params: any) {
    return Joi.object()
      .keys({
        eventId: Joi.string().uuid().required(),
      })
      .validate(params)
  }
}
