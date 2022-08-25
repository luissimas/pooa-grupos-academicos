import { LoginController } from '@controllers/loginController'
import { LoginUsecaseFactory } from '@factories/usecase/user/loginUsecaseFactory'
import { IHttpController } from '@http'

export class LoginControllerFactory {
  createController(): IHttpController {
    const loginUsecase = new LoginUsecaseFactory().createUsecase()
    const loginController = new LoginController(loginUsecase)

    return loginController
  }
}
