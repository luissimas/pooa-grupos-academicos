import { IAcademicGroupRepository } from '@repositories/academicGroupRepository'
import { UserDTO } from '@dtos/user'
import { IUsecase } from '@usecases'
import { IIdService } from '@services/id'
import { AcademicGroup, AcademicGroupStatusEnum } from '@entities/academicGroup'
import { UserRoleEnum } from '@entities/user'
import { BusinessLogicError, EntityNotFound, ForbiddenError } from '@domain/errors'
import { IUserRepository } from '@application/repositories/userRepository'
import { DepartmentDTO } from '@application/dtos/department'
import { Student } from '@domain/entities/student'

export type CreateAcademicGroupUsecaseParams = {
  user: UserDTO
  data: {
    name: string
    description: string
    foundationDate: Date
    department: Omit<DepartmentDTO, 'id'>
    sponsorId: string
    members: string[]
    maxMembers: number
  }
}

export type CreateAcademicGroupUsecaseResult = {
  id: string
}

export interface ICreateAcademicGroupUsecase
  extends IUsecase<CreateAcademicGroupUsecaseParams, CreateAcademicGroupUsecaseResult> {}

export class CreateAcademicGroupUsecase implements ICreateAcademicGroupUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly userRepository: IUserRepository,
    private readonly idService: IIdService
  ) {}

  async execute({ user, data }: CreateAcademicGroupUsecaseParams): Promise<CreateAcademicGroupUsecaseResult> {
    if (user.role !== UserRoleEnum.Professor) throw new ForbiddenError()

    // Validating sponsor
    const sponsor = await this.userRepository.getById(data.sponsorId)
    if (!sponsor) throw new EntityNotFound('professor')

    // Validating members
    const members = await Promise.all(data.members.map(id => this.userRepository.getById(id)))
    if (members.includes(undefined)) throw new EntityNotFound('student')
    if (members.find(member => member!.role !== UserRoleEnum.Student))
      throw new BusinessLogicError('all members of academic group must be students')

    const id = this.idService.generate()
    const academicGroup = new AcademicGroup({
      ...data,
      id,
      status: AcademicGroupStatusEnum.Active,
      sponsor,
      members: { ...members } as Student[],
      invitedEvents: [],
      promotedEvents: [],
      recruitmentProcesses: [],
      department: { ...data.department, id: this.idService.generate() },
    } as AcademicGroup)

    this.academicGroupRepository.create(academicGroup)
    return { id }
  }
}
