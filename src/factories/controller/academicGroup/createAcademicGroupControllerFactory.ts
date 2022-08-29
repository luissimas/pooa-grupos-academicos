import { CreateAcademicGroupUsecaseFactory } from "@factories/usecase/academicGroup/createAcademicGroupUsecaseFactory"
import { CreateAcademicGroupController } from "@controllers/academicGroup/createAcademicGroupController"
import { IHttpController } from "@http"

export class CreateAcademicGroupControllerFactory {
  createController(): IHttpController {
    const createAcademicGroupUsecase = new CreateAcademicGroupUsecaseFactory().createUsecase()
    const createAcademicGroupController = new CreateAcademicGroupController(
      createAcademicGroupUsecase
    )

    return createAcademicGroupController
  }
}
