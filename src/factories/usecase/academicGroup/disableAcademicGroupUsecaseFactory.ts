import {
  DisableAcademicGroupUsecase,
  IDisableAcademicGroupUsecase,
} from '@application/usecases/academicGroup/disableAcademicGroupUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'

export abstract class DisableAcademicGroupUsecaseFactory {
  static createUsecase(): IDisableAcademicGroupUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()

    const disableAcademicGroupUsecase = new DisableAcademicGroupUsecase(academicGroupRepository)

    return disableAcademicGroupUsecase
  }
}
