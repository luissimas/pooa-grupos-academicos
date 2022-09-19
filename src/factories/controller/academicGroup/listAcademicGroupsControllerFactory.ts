import {
  ListAcademicGroupsUsecaseFactory
} from "@factories/usecase/academicGroup/listAcademicGroupsUsecaseFactory"
import {
  ListAcademicGroupsController
} from "@controllers/academicGroup/listAcademicGroupsController"
import { IHttpController } from "@http"

export abstract class ListAcademicGroupsControllerFactory {
  static createController(): IHttpController {
    const listAcademicGroupsUsecase = ListAcademicGroupsUsecaseFactory.createUsecase()
    const listAcademicGroupsController = new ListAcademicGroupsController(
      listAcademicGroupsUsecase
    )

    return listAcademicGroupsController
  }
}
