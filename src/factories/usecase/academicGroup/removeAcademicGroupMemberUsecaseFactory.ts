import {
  IRemoveAcademicGroupMemberUsecase,
  RemoveAcademicGroupMemberUsecase,
} from '@application/usecases/academicGroup/removeAcademicGroupMemberUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export abstract class RemoveAcademicGroupMemberUsecaseFactory {
  static createUsecase(): IRemoveAcademicGroupMemberUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()
    const userRepository = MemoryUserRepository.getInstance()

    const removeAcademicGroupMemberUsecase = new RemoveAcademicGroupMemberUsecase(
      academicGroupRepository,
      userRepository
    )
    return removeAcademicGroupMemberUsecase
  }
}
