import { CreateUserControllerFactory } from '@factories/controller/user/createUserControllerFactory'
import { LoginControllerFactory } from '@factories/controller/user/loginControllerFactory'
import { adaptController } from '@http/adapters/expressControllerAdapter'
import { Router } from 'express'

const loginController = new LoginControllerFactory().createController()
const createUserController = new CreateUserControllerFactory().createController()

const router = Router()

router.post('/login', adaptController(loginController))
router.post('/user', adaptController(createUserController))

export { router }
