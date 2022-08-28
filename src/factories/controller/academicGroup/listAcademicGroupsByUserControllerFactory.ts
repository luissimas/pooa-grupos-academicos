import { ListAcademicGroupsByUserUsecaseFactory } from '@factories/usecase/academicGroup/listAcademicGroupsByUserUsecaseFactory'
import { IHttpController } from '@http'
import { ListAcademicGroupsByUserController } from '@http/controllers/academicGroup/listAcademicGroupsByUserController'

export class ListAcademicGroupsByUserControllerFactory {
  createController(): IHttpController {
    const listAcademicGroupsByUserUsecase = new ListAcademicGroupsByUserUsecaseFactory().createUsecase()
    const listAcademicGroupsByUserController = new ListAcademicGroupsByUserController(listAcademicGroupsByUserUsecase)

    return listAcademicGroupsByUserController
  }
}
