import { UuidIdService } from '@infra/id/uuidIdService'
import { BcryptPasswordService } from '@infra/password/bcryptPasswordService'
import { MemoryUserRepository } from '@infra/repositories/user/memoryUserRepository'
import { CreateUserUsecase, ICreateUserUsecase } from '@usecases/user/createUserUsecase'

export class CreateUserUsecaseFactory {
  createUsecase(): ICreateUserUsecase {
    const userRepository = MemoryUserRepository.getInstance()
    const idService = UuidIdService.getInstance()
    const passwordService = BcryptPasswordService.getInstance()

    const createUserUsecase = new CreateUserUsecase(userRepository, idService, passwordService)

    return createUserUsecase
  }
}
