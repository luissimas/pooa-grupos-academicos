import {
  IListAcademicGroupsUsecase
} from "@usecases/academicGroup/listAcademicGroupsUsecase"
import {
  MemoryAcademicGroupRepository
} from "@infra/repositories/academicGroup/memoryAcademicGroupRepository"
import { ListAcademicGroupsUsecase } from "@usecases/academicGroup/listAcademicGroupsUsecase"

export abstract class ListAcademicGroupsUsecaseFactory {
  static createUsecase(): IListAcademicGroupsUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()

    const listAcademicGroupsUsecase = new ListAcademicGroupsUsecase(academicGroupRepository)

    return listAcademicGroupsUsecase
  }
}
