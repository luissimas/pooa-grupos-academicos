import { IAcademicGroupRepository } from '@repositories/academicGroupRepository'
import { AcademicGroupDTO } from '@dtos/academicGroup'
import { IUsecase } from '@usecases'

export type ListAcademicGroupsInput = {
  name?: string
}

export type ListAcademicGroupsResult = AcademicGroupDTO[]

export interface IListAcademicGroupsUsecase extends IUsecase<ListAcademicGroupsInput, ListAcademicGroupsResult> {}

export class ListAcademicGroupsUsecase implements IListAcademicGroupsUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute(params: ListAcademicGroupsInput): Promise<ListAcademicGroupsResult> {
    const academicGroups = await this.academicGroupRepository.list(params.name)
    return academicGroups
  }
}
