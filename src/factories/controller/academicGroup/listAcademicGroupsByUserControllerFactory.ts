import { ListAcademicGroupsByUserUsecaseFactory } from '@factories/usecase/academicGroup/listAcademicGroupsByUserUsecaseFactory'
import { IHttpController } from '@http'
import { ListAcademicGroupsByUserController } from '@http/controllers/academicGroup/listAcademicGroupsByUserController'

export abstract class ListAcademicGroupsByUserControllerFactory {
  static createController(): IHttpController {
    const listAcademicGroupsByUserUsecase = ListAcademicGroupsByUserUsecaseFactory.createUsecase()
    const listAcademicGroupsByUserController = new ListAcademicGroupsByUserController(listAcademicGroupsByUserUsecase)

    return listAcademicGroupsByUserController
  }
}
