import {
  listAcademicGroupByIdUsecaseFactory
} from "@factories/usecase/academicGroup/listAcademicGroupByIdUsecaseFactory"
import {
  ListAcademicGroupByIdController
} from "@controllers/academicGroup/listAcademicGroupByIdController"
import { IHttpController } from "@http"

export abstract class ListAcademicGroupByIdControllerFactory {
  static createController(): IHttpController {
    const listAcademicGroupByIdUsecase = listAcademicGroupByIdUsecaseFactory.createUsecase()
    const listAcademicGroupByIdController = new ListAcademicGroupByIdController(listAcademicGroupByIdUsecase)

    return listAcademicGroupByIdController
  }
}
