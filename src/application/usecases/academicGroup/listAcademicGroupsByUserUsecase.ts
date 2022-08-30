import { AcademicGroupDTO } from '@application/dtos/academicGroup'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IUserRepository } from '@application/repositories/userRepository'
import { EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type ListAcademicGroupsByUserParams = {
  userId: string
}

export type ListAcademicGroupsByUserResult = AcademicGroupDTO[]

export interface IListAcademicGroupsByUserUsecase
  extends IUsecase<ListAcademicGroupsByUserParams, ListAcademicGroupsByUserResult> {}

export class ListAcademicGroupsByUserUsecase implements IListAcademicGroupsByUserUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ userId }: ListAcademicGroupsByUserParams): Promise<ListAcademicGroupsByUserResult> {
    const existingUser = await this.userRepository.getById(userId)

    if (!existingUser) throw new EntityNotFound('user')

    const academicGroups = await this.academicGroupRepository.getByUser(userId)
    return academicGroups
  }
}
