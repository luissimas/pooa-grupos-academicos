import { CreateAcademicGroupControllerFactory } from "@factories/controller/academicGroup/createAcademicGroupControllerFactory"
import { adaptController } from "@adapters/expressControllerAdapter"
import { Router } from "express"

const createAcademicGroupController = new CreateAcademicGroupControllerFactory().createController()

const router = Router()

router.post('/', adaptController(createAcademicGroupController))

export { router }
