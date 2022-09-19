import {
  IListEventByAcademicGroupUsecase,
  ListEventByAcademicGroupUsecase,
} from '@application/usecases/event/listEventByAcademicGroupUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { MemoryEventRepository } from '@infra/repositories/event/memoryEventRepository'

export abstract class ListEventByAcademicGroupUsecaseFactory {
  static createUsecase(): IListEventByAcademicGroupUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const eventRepository = MemoryEventRepository.getInstance()

    const listEventByAcademicGroupUsecase = new ListEventByAcademicGroupUsecase(eventRepository, academicGroupRepository)

    return listEventByAcademicGroupUsecase
  }
}
