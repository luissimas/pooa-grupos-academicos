import { UserDTO } from '@application/dtos/user'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IUserRepository } from '@application/repositories/userRepository'
import { AcademicGroup, AcademicGroupStatusEnum } from '@domain/entities/academicGroup'
import { UserRoleEnum } from '@domain/entities/user'
import { BusinessLogicError, EntityNotFound, UnauthorizedError } from '@domain/errors'
import { MemoryAcademicGroupRepository } from '@infra/repositories/academicGroup/memoryAcademicGroupRepository'
import { runInThisContext } from 'vm'
import { IUsecase } from '..'
import { AddAcademicGroupMemberUsecase } from './addAcademicGroupMemberUsecase'

export type RemoveAcademicGroupMemberParams = {
  user: UserDTO
  memberId: string
  academicGroupId: string
}

export interface IRemoveAcademicGroupMemberUsecase extends IUsecase<RemoveAcademicGroupMemberParams, void> {}

export class RemoveAcademicGroupMemberUsecase implements IRemoveAcademicGroupMemberUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute({ user, memberId, academicGroupId }: RemoveAcademicGroupMemberParams): Promise<any> {
    if (user.role !== UserRoleEnum.Professor)
      throw new UnauthorizedError('Only a professor is able to remove someone from a group.')

    const member = await this.userRepository.getById(memberId)

    if (!member) throw new EntityNotFound('user')

    const academicGroup = await this.academicGroupRepository.getById(academicGroupId)

    if (!academicGroup) throw new EntityNotFound('group')

    if (academicGroup.status !== AcademicGroupStatusEnum.Active)
      throw new BusinessLogicError('Only active groups are subject to alterations.')

    if (!academicGroup.members.some(member => member.id === memberId))
      throw new BusinessLogicError("Given user isn't a member from this group.")

    const newMembers = academicGroup.members.filter(member => member.id !== memberId)

    await this.academicGroupRepository.update({ ...academicGroup, members: newMembers })
  }
}
