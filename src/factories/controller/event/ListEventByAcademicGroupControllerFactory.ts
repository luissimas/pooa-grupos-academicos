import { ListEventByAcademicGroupUsecaseFactory } from '@factories/usecase/event/listEventByAcademicGroupsUsecaseFactory'
import { IHttpController } from '@http'
import { ListEventByAcademicGroupController } from '@http/controllers/event/ListEventByAcademicGroupsController'

export abstract class ListEventByAcademicGroupsUsecaseControllerFactory {
  static createController(): IHttpController {
    const listEventByAcademicGroupUsecase = ListEventByAcademicGroupUsecaseFactory.createUsecase()
    const listEventByAcademicGroupController = new ListEventByAcademicGroupController(listEventByAcademicGroupUsecase)

    return listEventByAcademicGroupController
  }
}
