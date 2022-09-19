import { ListEventByAcademicGroupUsecaseFactory } from '@factories/usecase/event/listEventByAcademicGroupUsecaseFactory'
import { IHttpController } from '@http'
import { ListEventByAcademicGroupController } from '@http/controllers/event/listEventByAcademicGroupController'

export abstract class ListEventByAcademicGroupControllerFactory {
  static createController(): IHttpController {
    const listEventByAcademicGroupUsecase = ListEventByAcademicGroupUsecaseFactory.createUsecase()
    const listEventByAcademicGroupController = new ListEventByAcademicGroupController(listEventByAcademicGroupUsecase)

    return listEventByAcademicGroupController
  }
}
