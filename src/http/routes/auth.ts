import { adaptController } from '@adapters/expressControllerAdapter'
import { LoginControllerFactory } from '@factories/controller/auth/loginControllerFactory'
import { Router } from 'express'

const loginController = new LoginControllerFactory().createController()

const router = Router()

router.post('/login', adaptController(loginController))

export { router }
