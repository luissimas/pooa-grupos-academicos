import { CreateUserController } from '@controllers/user/createUserController'
import { CreateUserUsecaseFactory } from '@factories/usecase/user/createUserUsecaseFactory'
import { IHttpController } from '@http'

export class CreateUserControllerFactory {
  createController(): IHttpController {
    const createUserUsecase = new CreateUserUsecaseFactory().createUsecase()
    const createUserController = new CreateUserController(createUserUsecase)

    return createUserController
  }
}
