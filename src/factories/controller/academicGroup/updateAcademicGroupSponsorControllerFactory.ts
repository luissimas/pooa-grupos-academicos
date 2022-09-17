import { UpdateAcademicGroupSponsorUsecaseFactory } from '@factories/usecase/academicGroup/updateAcademicGroupSponsorUsecaseFactory'
import { IHttpController } from '@http'
import { UpdateAcademicGroupSponsorController } from '@http/controllers/academicGroup/updateAcademicGroupSponsorController'

export abstract class UpdateAcademicGroupSponsorControllerFactory {
  static createController(): IHttpController {
    const updateAcademicGroupSponsorUsecase = UpdateAcademicGroupSponsorUsecaseFactory.createUsecase()

    const updateAcademicGroupSponsorController = new UpdateAcademicGroupSponsorController(
      updateAcademicGroupSponsorUsecase
    )

    return updateAcademicGroupSponsorController
  }
}
