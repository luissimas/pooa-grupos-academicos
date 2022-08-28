import { UuidIdService } from "@infra/id/uuidIdService"
import { MemoryAcademicGroupRepository } from "@infra/repositories/academicGroup/academicGroupRepository"
import { CreateAcademicGroupUsecase, ICreateAcademicGroupUsecase } from "@usecases/academicGroup/createAcademicGroupUsecase"

export class CreateAcademicGroupUsecaseFactory {
  createUsecase(): ICreateAcademicGroupUsecase {
    const academicGroupRepository = new MemoryAcademicGroupRepository()
    const idService = new UuidIdService()

    const createAcademicGroupUsecase = new CreateAcademicGroupUsecase(
      academicGroupRepository,
      idService
    )

    return createAcademicGroupUsecase
  }
}
