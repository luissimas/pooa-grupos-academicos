import { UserDTO } from '@application/dtos/user'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type listAcademicGroupMembersUsecaseParams = {
  academicGroupId: string
}

export type listAcademicGroupMembersUsecaseResult = UserDTO[]

export interface IListAcademicGroupMembersUsecase
  extends IUsecase<listAcademicGroupMembersUsecaseParams, listAcademicGroupMembersUsecaseResult> {}

export class listAcademicGroupMembersUsecase implements IListAcademicGroupMembersUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute(params: listAcademicGroupMembersUsecaseParams): Promise<listAcademicGroupMembersUsecaseResult> {
    const existingGroup = await this.academicGroupRepository.getById(params.academicGroupId)

    if (!existingGroup) throw new EntityNotFound('group')

    return [...existingGroup.members, existingGroup.sponsor]
  }
}
