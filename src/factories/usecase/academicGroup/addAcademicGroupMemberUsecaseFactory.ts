import {
  AddAcademicGroupMemberUsecase,
  IAddAcademicGroupMemberUsecase,
} from '@application/usecases/academicGroup/addAcademicGroupMemberUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { ApiClassEnrollmentRepository } from '@infra/repositories/classEnrollment/apiClassEnrollmentRepository'
import { ApiLibraryReservationRepository } from '@infra/repositories/libraryReservation/apiLibraryReservationRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export abstract class AddAcademicGroupMemberUsecaseFactory {
  static createUsecase(): IAddAcademicGroupMemberUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()
    const classEnrolmentRepository = ApiClassEnrollmentRepository.getInstance()
    const libraryReservationRepository = ApiLibraryReservationRepository.getInstance()

    const addAcademicGroupMemberUsecase = new AddAcademicGroupMemberUsecase(
      academicGroupRepository,
      userRepository,
      classEnrolmentRepository,
      libraryReservationRepository
    )
    return addAcademicGroupMemberUsecase
  }
}
