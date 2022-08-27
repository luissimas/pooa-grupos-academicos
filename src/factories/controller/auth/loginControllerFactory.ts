import { LoginController } from '@controllers/auth/loginController'
import { LoginUsecaseFactory } from '@factories/usecase/auth/loginUsecaseFactory'
import { IHttpController } from '@http'

export class LoginControllerFactory {
  createController(): IHttpController {
    const loginUsecase = new LoginUsecaseFactory().createUsecase()
    const loginController = new LoginController(loginUsecase)

    return loginController
  }
}
