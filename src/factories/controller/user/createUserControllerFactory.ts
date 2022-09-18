import { CreateUserController } from '@controllers/user/createUserController'
import { CreateUserUsecaseFactory } from '@factories/usecase/user/createUserUsecaseFactory'
import { IHttpController } from '@http'

export abstract class CreateUserControllerFactory {
  static createController(): IHttpController {
    const createUserUsecase = CreateUserUsecaseFactory.createUsecase()
    const createUserController = new CreateUserController(createUserUsecase)

    return createUserController
  }
}
