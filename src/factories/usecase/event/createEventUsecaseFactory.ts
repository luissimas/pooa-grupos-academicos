import { CreateEventUsecase, ICreateEventUsecase } from '@application/usecases/event/createEventUsecase'
import { UuidIdService } from '@infra/id/uuidIdService'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { ApiClassEnrollmentRepository } from '@infra/repositories/classEnrollment/apiClassEnrollmentRepository'
import { MemoryEventRepository } from '@infra/repositories/event/memoryEventRepository'
import { ApiLibraryReservationRepository } from '@infra/repositories/libraryReservation/apiLibraryReservationRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export abstract class CreateEventUsecaseFactory {
  static createUsecase(): ICreateEventUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()
    const eventRepository = MemoryEventRepository.getInstance()
    const classEnrolmentRepository = ApiClassEnrollmentRepository.getInstance()
    const libraryReservationRepository = ApiLibraryReservationRepository.getInstance()
    const idService = UuidIdService.getInstance()

    const createEventUsecase = new CreateEventUsecase(
      academicGroupRepository,
      userRepository,
      eventRepository,
      classEnrolmentRepository,
      libraryReservationRepository,
      idService
    )

    return createEventUsecase
  }
}
