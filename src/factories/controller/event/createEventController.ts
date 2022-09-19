import { CreateEventUsecaseFactory } from '@factories/usecase/event/createEventUsecaseFactory'
import { IHttpController } from '@http'
import { CreateEventController } from '@http/controllers/event/createEventController'

export abstract class CreateEventControllerFactory {
  static createController(): IHttpController {
    const createEventUsecase = CreateEventUsecaseFactory.createUsecase()

    const createEventController = new CreateEventController(createEventUsecase)

    return createEventController
  }
}
