import { IAcademicGroupRepository } from "@repositories/academicGroupRepository"
import { AcademicGroupDTO } from "@dtos/academicGroup"
import { IUsecase } from "@usecases"

export type ListAcademicGroupsParams = {}

export type ListAcademicGroupsResult = AcademicGroupDTO[]

export interface IListAcademicGroupsUsecase extends IUsecase<
  ListAcademicGroupsParams, ListAcademicGroupsResult
> {}

export class ListAcademicGroupsUsecase implements IListAcademicGroupsUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository
  ){}

  async execute({}: ListAcademicGroupsParams): Promise<ListAcademicGroupsResult> {
    const academicGroups = await this.academicGroupRepository.list()
    return academicGroups
  }
}
