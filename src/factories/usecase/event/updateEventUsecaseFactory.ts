import { IUpdateEventUsecase, UpdateEventUsecase } from '@application/usecases/event/updateEventUsecase'
import { UuidIdService } from '@infra/id/uuidIdService'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { MemoryEventRepository } from '@infra/repositories/event/memoryEventRepository'

export abstract class UpdateEventUsecaseFactory {
  static createUsecase(): IUpdateEventUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const eventRepository = MemoryEventRepository.getInstance()
    const idService = UuidIdService.getInstance()

    const updateEventUsecase = new UpdateEventUsecase(academicGroupRepository, eventRepository, idService)

    return updateEventUsecase
  }
}
