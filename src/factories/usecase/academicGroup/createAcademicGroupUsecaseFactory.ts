import { UuidIdService } from '@infra/id/uuidIdService'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/academicGroupRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import {
  CreateAcademicGroupUsecase,
  ICreateAcademicGroupUsecase,
} from '@usecases/academicGroup/createAcademicGroupUsecase'

export class CreateAcademicGroupUsecaseFactory {
  createUsecase(): ICreateAcademicGroupUsecase {
    const academicGroupRepository = new MemoryAcademicGroupRepository()
    const userRepository = new MemoryUserRepository()
    const idService = new UuidIdService()

    const createAcademicGroupUsecase = new CreateAcademicGroupUsecase(
      academicGroupRepository,
      userRepository,
      idService
    )

    return createAcademicGroupUsecase
  }
}
