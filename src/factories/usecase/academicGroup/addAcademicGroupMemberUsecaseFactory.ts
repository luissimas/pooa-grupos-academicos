import {
  AddAcademicGroupMemberUsecase,
  IAddAcademicGroupMemberUsecase,
} from '@application/usecases/academicGroup/addAcademicGroupMemberUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { ApiClassEnrollmentRepository } from '@infra/repositories/classEnrollment/apiClassEnrollmentRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export class AddAcademicGroupMemberUsecaseFactory {
  createUsecase(): IAddAcademicGroupMemberUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()
    const classEnrolmentRepository = ApiClassEnrollmentRepository.getInstance()

    const addAcademicGroupMemberUsecase = new AddAcademicGroupMemberUsecase(
      academicGroupRepository,
      userRepository,
      classEnrolmentRepository
    )
    return addAcademicGroupMemberUsecase
  }
}
