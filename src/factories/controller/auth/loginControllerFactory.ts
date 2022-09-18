import { LoginController } from '@controllers/auth/loginController'
import { LoginUsecaseFactory } from '@factories/usecase/auth/loginUsecaseFactory'
import { IHttpController } from '@http'

export abstract class LoginControllerFactory {
  static createController(): IHttpController {
    const loginUsecase = LoginUsecaseFactory.createUsecase()
    const loginController = new LoginController(loginUsecase)

    return loginController
  }
}
