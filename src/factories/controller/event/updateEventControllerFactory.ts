import { UpdateEventUsecaseFactory } from '@factories/usecase/event/updateEventUsecaseFactory'
import { IHttpController } from '@http'
import { UpdateEventController } from '@http/controllers/event/updateEventController'

export abstract class UpdateEventControllerFactory {
  static createController(): IHttpController {
    const updateEventUsecase = UpdateEventUsecaseFactory.createUsecase()

    const updateEventController = new UpdateEventController(updateEventUsecase)

    return updateEventController
  }
}
