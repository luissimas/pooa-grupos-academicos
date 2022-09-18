import { listAcademicGroupMembersUsecaseFactory } from '@factories/usecase/academicGroup/listAcademicGroupMembersUsecaseFactory'
import { IHttpController } from '@http'
import { ListAcademicGroupMembersController } from '@http/controllers/academicGroup/listAcademicGroupMembersController'

export abstract class ListAcademicGroupMembersControllerFactory {
  static createController(): IHttpController {
    const listAcademicGroupMembersUsecase = listAcademicGroupMembersUsecaseFactory.createUsecase()
    const listAcademicGroupMembersController = new ListAcademicGroupMembersController(listAcademicGroupMembersUsecase)

    return listAcademicGroupMembersController
  }
}
