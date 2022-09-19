import {
  IListAcademicGroupByIdUsecase,
  ListAcademicGroupByIdUsecase
} from "@usecases/academicGroup/listAcademicGroupByIdUsecase"
import {
  MemoryAcademicGroupRepository
} from "@infra/repositories/academicGroup/memoryAcademicGroupRepository"

export abstract class listAcademicGroupByIdUsecaseFactory {
  static createUsecase(): IListAcademicGroupByIdUsecase {
    const academicGroupRepository = MemoryAcademicGroupRepository.getInstance()

    const listAcademicGroupByIdUsecase = new ListAcademicGroupByIdUsecase(academicGroupRepository)

    return listAcademicGroupByIdUsecase
  }
}
