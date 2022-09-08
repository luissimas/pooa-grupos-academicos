import {
  IListAcademicGroupsByUserUsecase,
  ListAcademicGroupsByUserUsecase,
} from '@application/usecases/academicGroup/listAcademicGroupsByUserUsecase'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'

export class ListAcademicGroupsByUserUsecaseFactory {
  createUsecase(): IListAcademicGroupsByUserUsecase {
    const academicGroupRepository = new MemoryAcademicGroupRepository()
    const userRepository = MemoryUserRepository.getInstance()

    const listAcademicGroupsByUserUsecase = new ListAcademicGroupsByUserUsecase(academicGroupRepository, userRepository)

    return listAcademicGroupsByUserUsecase
  }
}
