import { CreateEventUsecaseResult, ICreateEventUsecase } from '@application/usecases/event/createEventUsecase'
import { ForbiddenError, InvalidFieldError } from '@domain/errors'
import { HttpRequest, HttpResponse, IHttpController } from '@http'
import Joi from 'joi'

export class CreateEventController implements IHttpController {
  constructor(private readonly createEventUsecase: ICreateEventUsecase) {}

  async handle(request: HttpRequest): Promise<HttpResponse<CreateEventUsecaseResult>> {
    if (!request.body) throw new InvalidFieldError('body')
    const params = this.validateBody(request.body)
    const user = request.context?.user

    if (params.error) throw new InvalidFieldError(params.error.message)
    if (!user) throw new ForbiddenError()

    const id = await this.createEventUsecase.execute(params.value)
    return {
      status: 201,
      data: id,
    }
  }

  private validateBody(body: any) {
    return Joi.object()
      .keys({
        name: Joi.string().required(),
        date: Joi.string().isoDate().required(),
        promoters: Joi.array().items(Joi.string().uuid().required()).required(),
        status: Joi.string().pattern(/^future$|^occuring$|^canceled$/),
        location: Joi.object()
          .keys({
            street: Joi.string().required(),
            number: Joi.string().required(),
            district: Joi.string().required(),
            zipCode: Joi.string().required(),
            complement: Joi.string().required(),
            referencePoint: Joi.string().required(),
          })
          .required(),
        speakers: Joi.array().items(Joi.string().required()).required(),
        groupsPromoting: Joi.array().items(Joi.string().uuid().required()).required(),
        groupsInvited: Joi.array().items(Joi.string().uuid()).required(),
      })
      .validate(body)
  }
}
