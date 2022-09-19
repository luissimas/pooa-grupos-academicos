import { DisableAcademicGroupUsecaseFactory } from '@factories/usecase/academicGroup/disableAcademicGroupUsecaseFactory'
import { IHttpController } from '@http'
import { DisableAcademicGroupController } from '@http/controllers/academicGroup/disableAcademicGroupController'

export abstract class DisableAcademicGroupControllerFactory {
  static createController(): IHttpController {
    const disableAcademicGroupUsecase = DisableAcademicGroupUsecaseFactory.createUsecase()

    const disableAcademicGroupController = new DisableAcademicGroupController(disableAcademicGroupUsecase)

    return disableAcademicGroupController
  }
}
