import { IAcademicGroupRepository } from "@repositories/academicGroupRepository"
import { AcademicGroupDTO } from "@dtos/academicGroup"
import { IUsecase } from ".."
import { EntityNotFound } from "@errors"

export type ListAcademicGroupByIdParams = {
  academicGroupId: string
}

export type ListAcademicGroupByIdResult = AcademicGroupDTO

export interface IListAcademicGroupByIdUsecase
  extends IUsecase<ListAcademicGroupByIdParams, ListAcademicGroupByIdResult> {}

export class ListAcademicGroupByIdUsecase implements IListAcademicGroupByIdUsecase {
  constructor(private readonly academicGroupRepository: IAcademicGroupRepository) {}

  async execute(params: ListAcademicGroupByIdParams): Promise<ListAcademicGroupByIdResult> {
    const existingGroup = await this.academicGroupRepository.getById(params.academicGroupId)

    if (!existingGroup) throw new EntityNotFound('group')

    return existingGroup
  }
}

