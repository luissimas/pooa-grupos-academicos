import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IEventRepository } from '@application/repositories/eventRepository'
import { IIdService } from '@application/services/id'
import { AcademicGroup } from '@domain/entities/academicGroup'
import { Event, EventStatusEnum } from '@domain/entities/event'
import { EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type UpdateEventUsecaseParams = {
  eventId: string
  data: {
    name?: string
    date?: string
    status?: EventStatusEnum
    speakers?: string[]
    location?: {
      street: string
      number: string
      district: string
      zipCode: string
      complement: string
      referencePoint: string
    }
  }
}

export interface IUpdateEventUsecase extends IUsecase<UpdateEventUsecaseParams, void> {}

export class UpdateEventUsecase implements IUpdateEventUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly eventRepository: IEventRepository,
    private readonly idService: IIdService
  ) {}

  async execute(params: UpdateEventUsecaseParams): Promise<void> {
    const event = await this.eventRepository.getById(params.eventId)

    if (!event) throw new EntityNotFound('event')

    const newEvent = new Event({
      ...event,
      ...(params.data.name && { name: params.data.name }),
      ...(params.data.status && { status: params.data.status }),
      ...(params.data.speakers && { speakers: params.data.speakers }),
      ...(params.data.location && { location: { ...params.data.location, id: this.idService.generate() } }),
    })

    const promoterGroups = (
      await Promise.all(event.academicGroupsPromoters.map(groupId => this.academicGroupRepository.getById(groupId)))
    ).filter(group => group) as AcademicGroup[]

    const invitedGroups = (
      await Promise.all(event.academicGroupsInvited.map(groupId => this.academicGroupRepository.getById(groupId)))
    ).filter(group => group) as AcademicGroup[]

    await Promise.all(
      promoterGroups.map(group =>
        this.academicGroupRepository.update({
          ...group,
          promotedEvents: [...group.promotedEvents.filter(event => event.id === newEvent.id), newEvent],
        })
      )
    )

    await Promise.all(
      invitedGroups.map(group =>
        this.academicGroupRepository.update({
          ...group,
          invitedEvents: [...group.invitedEvents.filter(event => event.id === newEvent.id), newEvent],
        })
      )
    )

    await this.eventRepository.update(newEvent)
  }
}
