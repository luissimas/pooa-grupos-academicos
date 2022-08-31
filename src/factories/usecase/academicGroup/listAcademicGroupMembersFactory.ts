import {
  IListAcademicGroupMembersUsecase,
  ListAcademicGroupMembersUsecase,
} from '@application/usecases/academicGroup/listAcademicGroupMembersUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'

export class listAcademicGroupMembersUsecaseFactory {
  createUsecase(): IListAcademicGroupMembersUsecase {
    const academicGroupRepository = new MemoryAcademicGroupRepository()

    const listAcademicGroupMembersUsecase = new ListAcademicGroupMembersUsecase(academicGroupRepository)

    return listAcademicGroupMembersUsecase
  }
}
