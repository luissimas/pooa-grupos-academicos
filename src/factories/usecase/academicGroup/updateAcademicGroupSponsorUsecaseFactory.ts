import {
  IUpdateAcademicGroupSponsorUsecase,
  UpdateAcademicGroupSponsorUsecase,
} from '@application/usecases/academicGroup/updateAcademicGroupSponsorUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { ApiClassEnrollmentRepository } from '@infra/repositories/classEnrollment/apiClassEnrollmentRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export abstract class UpdateAcademicGroupSponsorUsecaseFactory {
  static createUsecase(): IUpdateAcademicGroupSponsorUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()
    const classEnrollmentRepository = ApiClassEnrollmentRepository.getInstance()

    const updateAcademicGroupSponsorUsecase = new UpdateAcademicGroupSponsorUsecase(
      academicGroupRepository,
      userRepository,
      classEnrollmentRepository
    )

    return updateAcademicGroupSponsorUsecase
  }
}
