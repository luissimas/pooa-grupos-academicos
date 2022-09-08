import { UserDTO } from '@application/dtos/user'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type ListAcademicGroupMembersUsecaseParams = {
  groupId: string
}

export type ListAcademicGroupMembersUsecaseResult = UserDTO[]

export interface IListAcademicGroupMembersUsecase
  extends IUsecase<ListAcademicGroupMembersUsecaseParams, ListAcademicGroupMembersUsecaseResult> {}

export class ListAcademicGroupMembersUsecase implements IListAcademicGroupMembersUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute(params: ListAcademicGroupMembersUsecaseParams): Promise<ListAcademicGroupMembersUsecaseResult> {
    const existingGroup = await this.academicGroupRepository.getById(params.groupId)

    if (!existingGroup) throw new EntityNotFound('group')

    return [...existingGroup.members, existingGroup.sponsor]
  }
}
