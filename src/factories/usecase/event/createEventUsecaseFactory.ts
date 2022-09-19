import { CreateEventUsecase, ICreateEventUsecase } from '@application/usecases/event/createEventUsecase'
import { UuidIdService } from '@infra/id/uuidIdService'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export abstract class CreateEventUsecaseFactory {
  static createUsecase(): ICreateEventUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()
    const idService = UuidIdService.getInstance()

    const createEventUsecase = new CreateEventUsecase(academicGroupRepository, userRepository, idService)

    return createEventUsecase
  }
}
