import { IAcademicGroupRepository } from "@repositories/academicGroupRepository"
import { AcademicGroupDTO } from "@dtos/academicGroup"
import { IUsecase } from ".."
import { EntityNotFound } from "@errors"

export type ListAcademicGroupByIdUsecaseParams = {
  academicGroupId: string
}

export type ListAcademicGroupByIdUsecaseResult = AcademicGroupDTO

export interface IListAcademicGroupByIdUsecase
  extends IUsecase<ListAcademicGroupByIdUsecaseParams, ListAcademicGroupByIdUsecaseResult> {}

export class ListAcademicGroupByIdUsecase implements IListAcademicGroupByIdUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute(params: ListAcademicGroupByIdUsecaseParams): Promise<ListAcademicGroupByIdUsecaseResult> {
    const existingGroup = await this.academicGroupRepository.getById(params.academicGroupId)

    if (!existingGroup) throw new EntityNotFound('group')

    return existingGroup
  }
}
