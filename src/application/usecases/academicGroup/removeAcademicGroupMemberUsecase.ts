import { UserDTO } from '@application/dtos/user'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IUserRepository } from '@application/repositories/userRepository'
import { AcademicGroupStatusEnum } from '@domain/entities/academicGroup'
import { BusinessLogicError, EntityNotFound, ForbiddenError } from '@domain/errors'
import { IUsecase } from '..'

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
    const academicGroup = await this.academicGroupRepository.getById(academicGroupId)

    if (!academicGroup) throw new EntityNotFound('group')

    if (academicGroup.sponsor.id !== user.id)
      throw new ForbiddenError('only the group sponsor can remove an member from the academic group')

    if (academicGroup.status !== AcademicGroupStatusEnum.Active)
      throw new BusinessLogicError('only active groups are subject to alterations')

    const member = await this.userRepository.getById(memberId)

    if (!member) throw new EntityNotFound('user')

    if (!academicGroup.members.some(member => member.id === memberId))
      throw new BusinessLogicError("fiven user isn't a member from this group")

    const newMembers = academicGroup.members.filter(member => member.id !== memberId)

    await this.academicGroupRepository.update({ ...academicGroup, members: newMembers })
  }
}
