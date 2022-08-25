import { LoginControllerFactory } from '@factories/controller/user/loginControllerFactory'
import { adaptController } from '@http/adapters/expressControllerAdapter'
import { Router } from 'express'

const loginController = new LoginControllerFactory().createController()

const router = Router()

router.post('/login', adaptController(loginController))

export { router }
