import { UuidIdService } from '@infra/id/uuidIdService'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import {
  CreateAcademicGroupUsecase,
  ICreateAcademicGroupUsecase,
} from '@usecases/academicGroup/createAcademicGroupUsecase'

export class CreateAcademicGroupUsecaseFactory {
  createUsecase(): ICreateAcademicGroupUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()
    const idService = new UuidIdService()

    const createAcademicGroupUsecase = new CreateAcademicGroupUsecase(
      academicGroupRepository,
      userRepository,
      idService
    )

    return createAcademicGroupUsecase
  }
}
