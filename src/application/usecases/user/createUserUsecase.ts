import { StudentDTO, ProfessorDTO } from '@application/dtos/user'
import { Student } from '@entities/student'
import { Professor } from '@entities/professor'
import { UserRoleEnum } from '@entities/user'
import { IUserRepository } from '@repositories/userRepository'
import { IIdService } from '@services/id'
import { IPasswordService } from '@services/password'
import { IUsecase } from '@usecases'
import { UserAlreadyExists } from '@domain/errors'

export type CreateUserUsecaseParams = StudentDTO | ProfessorDTO

export type CreateUserUsecaseResult = {
  id: string
}

export interface ICreateUserUsecase extends IUsecase<CreateUserUsecaseParams, CreateUserUsecaseResult> {}

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly idService: IIdService,
    private readonly passwordService: IPasswordService
  ) {}

  async execute(params: CreateUserUsecaseParams): Promise<CreateUserUsecaseResult> {
    const existingUser = await this.userRepository.getByEmail(params.email)

    if (existingUser) throw new UserAlreadyExists('email', params.email)

    const id = this.idService.generate()
    const hashedPassword = await this.passwordService.hashPassword(params.password)

    const user =
      params.role === UserRoleEnum.Student
        ? new Student({ ...params, password: hashedPassword, id } as Student)
        : new Professor({ ...params, password: hashedPassword, id } as Professor)

    this.userRepository.create(user)

    return { id }
  }
}
