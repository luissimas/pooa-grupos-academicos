import { EventDTO } from '@application/dtos/event'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IEventRepository } from '@application/repositories/eventRepository'
import { EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type ListEventByAcademicGroupParams = {
  academicGroupId: string
}

export type ListEventByAcademicGroupResult = EventDTO[]

export interface IListEventByAcademicGroupUsecase
  extends IUsecase<ListEventByAcademicGroupParams, ListEventByAcademicGroupResult> {}

export class ListEventByAcademicGroupUsecase implements IListEventByAcademicGroupUsecase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly academicGroupRepository: IAcademicGroupRepository
  ) {}

  async execute({ academicGroupId }: ListEventByAcademicGroupParams): Promise<ListEventByAcademicGroupResult> {
    const existingAcademicGroup = await this.academicGroupRepository.getById(academicGroupId)

    if (!existingAcademicGroup) throw new EntityNotFound('academicGroup')

    const events = await this.eventRepository.listByAcademicGroup(academicGroupId)
    return events
  }
}
