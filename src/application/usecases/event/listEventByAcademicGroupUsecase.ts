import { EventDTO } from '@application/dtos/event'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IEventRepository } from '@application/repositories/userRepository'
import { EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type ListEventByAcademicGroupParams = {
  academicGroupId: string
}

export type ListEventByAcademicGroupResult = EventDTO[]

export interface IListEventByAcademicGroupUseCase
  extends IUsecase<ListEventByAcademicGroupParams, ListEventByAcademicGroupResult> {}

export class ListAcademicGroupsByUserUsecase implements IListEventByAcademicGroupUseCase {
  constructor(
    private readonly eventRepository: IEventRepository,
    private readonly academicGroupRepository: IAcademicGroupRepository
  ) {}

  async execute({ academicGroupId }: ListEventByAcademicGroupParams): Promise<ListEventByAcademicGroupResult> {
    const existingAcademicGroup = await this.academicGroupRepository.getById(academicGroupId)

    if (!existingAcademicGroup) throw new EntityNotFound('academicGroup')

    const events = await this.eventRepository.getByAcademicGroup(academicGroupId)
    return events
  }
}
