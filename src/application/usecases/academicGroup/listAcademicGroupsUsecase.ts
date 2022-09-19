import { IAcademicGroupRepository } from '@repositories/academicGroupRepository'
import { AcademicGroupDTO } from '@dtos/academicGroup'
import { IUsecase } from '@usecases'

export type ListAcademicGroupsResult = AcademicGroupDTO[]

export interface IListAcademicGroupsUsecase extends IUsecase<void, ListAcademicGroupsResult> {}

export class ListAcademicGroupsUsecase implements IListAcademicGroupsUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute(): Promise<ListAcademicGroupsResult> {
    const academicGroups = await this.academicGroupRepository.list()
    return academicGroups
  }
}
