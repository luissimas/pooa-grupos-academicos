import { adaptController } from '@adapters/expressControllerAdapter'
import { LoginControllerFactory } from '@factories/controller/auth/loginControllerFactory'
import { CreateUserControllerFactory } from '@factories/controller/user/createUserControllerFactory'
import { Router } from 'express'

const loginController = new LoginControllerFactory().createController()
const createUserController = new CreateUserControllerFactory().createController()

const router = Router()

router.post('/login', adaptController(loginController))
router.post('/user', adaptController(createUserController))

export { router }
