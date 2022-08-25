import { CreateUserUsecase, ICreateUserUsecase } from 'application/usecase/user/createUserUsecase'
import { UuidIdService } from 'infra/id/uuidIdService'
import { BcryptPasswordService } from 'infra/password/bcryptPasswordService'
import { MemoryUserRepository } from 'infra/repositories/user/memoryUserRepository'

export class CreateUserUsecaseFactory {
  createUsecase(): ICreateUserUsecase {
    const userRepository = new MemoryUserRepository()
    const idService = new UuidIdService()
    const passwordService = new BcryptPasswordService()

    const createUserUsecase = new CreateUserUsecase(userRepository, idService, passwordService)

    return createUserUsecase
  }
}
