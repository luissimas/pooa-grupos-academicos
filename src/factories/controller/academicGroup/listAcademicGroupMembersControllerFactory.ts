import { listAcademicGroupMembersUsecaseFactory } from '@factories/usecase/academicGroup/listAcademicGroupMembersFactory'
import { IHttpController } from '@http'
import { ListAcademicGroupMembersController } from '@http/controllers/academicGroup/listAcademicGroupMembersController'

export class listAcademicGroupMembersControllerFactory {
  createController(): IHttpController {
    const listAcademicGroupMembersUsecase = new listAcademicGroupMembersUsecaseFactory().createUsecase()
    const listAcademicGroupMembersController = new ListAcademicGroupMembersController(listAcademicGroupMembersUsecase)

    return listAcademicGroupMembersController
  }
}
