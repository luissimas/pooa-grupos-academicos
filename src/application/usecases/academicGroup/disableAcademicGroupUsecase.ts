import { UserDTO } from '@application/dtos/user'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { AcademicGroupStatusEnum } from '@domain/entities/academicGroup'
import { UserRoleEnum } from '@domain/entities/user'
import { BusinessLogicError, EntityNotFound, ForbiddenError } from '@domain/errors'
import { IUsecase } from '..'

export type DisableAcademicGroupUsecaseParams = {
  user: UserDTO
  academicGroupId: string
}

export interface IDisableAcademicGroupUsecase extends IUsecase<DisableAcademicGroupUsecaseParams, void> {}

export class DisableAcademicGroupUsecase implements IDisableAcademicGroupUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute({ user, academicGroupId }: DisableAcademicGroupUsecaseParams): Promise<void> {
    if (user.role !== UserRoleEnum.Professor) throw new ForbiddenError('only professors can disable academic groups')

    const academicGroup = await this.academicGroupRepository.getById(academicGroupId)

    if (!academicGroup) throw new EntityNotFound('academic group')

    if (user.id !== academicGroup.sponsor.id)
      throw new ForbiddenError('an academic group can be disabled only by its sponsor')

    if (academicGroup.status !== AcademicGroupStatusEnum.Active)
      throw new BusinessLogicError('academic group is not currently active')

    await this.academicGroupRepository.update({ ...academicGroup, status: AcademicGroupStatusEnum.Inactive })
  }
}
