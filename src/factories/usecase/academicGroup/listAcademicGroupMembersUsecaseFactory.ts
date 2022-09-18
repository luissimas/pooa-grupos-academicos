import {
  IListAcademicGroupMembersUsecase,
  ListAcademicGroupMembersUsecase,
} from '@application/usecases/academicGroup/listAcademicGroupMembersUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'

export abstract class listAcademicGroupMembersUsecaseFactory {
  static createUsecase(): IListAcademicGroupMembersUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()

    const listAcademicGroupMembersUsecase = new ListAcademicGroupMembersUsecase(academicGroupRepository)

    return listAcademicGroupMembersUsecase
  }
}
