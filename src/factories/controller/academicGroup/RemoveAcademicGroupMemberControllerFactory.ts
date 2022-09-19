import { RemoveAcademicGroupMemberUsecaseFactory } from '@factories/usecase/academicGroup/removeAcademicGroupMemberUsecaseFactory'
import { IHttpController } from '@http'
import { RemoveAcademicGroupMemberController } from '@http/controllers/academicGroup/removeAcademicGroupMemberController'

export abstract class RemoveAcademicGroupMemberControllerFactory {
  static createController(): IHttpController {
    const removeAcademicGroupMemberUsecase = RemoveAcademicGroupMemberUsecaseFactory.createUsecase()
    const removeAcademicGroupMemberController = new RemoveAcademicGroupMemberController(
      removeAcademicGroupMemberUsecase
    )

    return removeAcademicGroupMemberController
  }
}
