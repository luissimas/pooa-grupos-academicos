import { AddAcademicGroupMemberUsecaseFactory } from '@factories/usecase/academicGroup/addAcademicGroupMemberUsecaseFactory'
import { IHttpController } from '@http'
import { AddAcademicGroupMemberController } from '@http/controllers/academicGroup/addAcademicGroupMemberController'

export class AddAcademicGroupMemberControllerFactory {
  createController(): IHttpController {
    const addAcademicGroupMemberUsecase = new AddAcademicGroupMemberUsecaseFactory().createUsecase()
    const addAcademicGroupMemberController = new AddAcademicGroupMemberController(addAcademicGroupMemberUsecase)

    return addAcademicGroupMemberController
  }
}
