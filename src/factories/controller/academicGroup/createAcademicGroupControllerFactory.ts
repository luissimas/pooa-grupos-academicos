import { CreateAcademicGroupUsecaseFactory } from '@factories/usecase/academicGroup/createAcademicGroupUsecaseFactory'
import { CreateAcademicGroupController } from '@controllers/academicGroup/createAcademicGroupController'
import { IHttpController } from '@http'

export abstract class CreateAcademicGroupControllerFactory {
  static createController(): IHttpController {
    const createAcademicGroupUsecase = CreateAcademicGroupUsecaseFactory.createUsecase()
    const createAcademicGroupController = new CreateAcademicGroupController(createAcademicGroupUsecase)

    return createAcademicGroupController
  }
}
