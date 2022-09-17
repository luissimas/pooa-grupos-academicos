import { AddAcademicGroupMemberUsecaseFactory } from '@factories/usecase/academicGroup/addAcademicGroupMemberUsecaseFactory'
import { IHttpController } from '@http'
import { AddAcademicGroupMemberController } from '@http/controllers/academicGroup/addAcademicGroupMemberController'

export abstract class AddAcademicGroupMemberControllerFactory {
  static createController(): IHttpController {
    const addAcademicGroupMemberUsecase = AddAcademicGroupMemberUsecaseFactory.createUsecase()
    const addAcademicGroupMemberController = new AddAcademicGroupMemberController(addAcademicGroupMemberUsecase)

    return addAcademicGroupMemberController
  }
}
