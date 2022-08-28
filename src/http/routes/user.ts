import { adaptController } from '@adapters/expressControllerAdapter'
import { CreateUserControllerFactory } from '@factories/controller/user/createUserControllerFactory'
import { Router } from 'express'

const createUserController = new CreateUserControllerFactory().createController()

const router = Router()

router.post('/', adaptController(createUserController))

export { router }
