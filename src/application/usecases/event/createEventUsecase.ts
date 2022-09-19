import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IUserRepository } from '@application/repositories/userRepository'
import { IIdService } from '@application/services/id'
import { AcademicGroup, AcademicGroupStatusEnum } from '@domain/entities/academicGroup'
import { Event, EventStatusEnum } from '@domain/entities/event'
import { Student } from '@domain/entities/student'
import { UserRoleEnum } from '@domain/entities/user'
import { BusinessLogicError, EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type CreateEventUsecaseParams = {
  name: string
  date: Date
  promoters: string[]
  status: EventStatusEnum
  location: {
    street: string
    number: string
    district: string
    zipCode: number
    complement: string
    referencePoint: string
  }
  speakers: string[]
  groupsPromoting: string[]
  groupsInvited: string[]
}

export type CreateEventUsecaseResult = {
  id: string
}

export interface ICreateEventUsecase extends IUsecase<CreateEventUsecaseParams, CreateEventUsecaseResult> {}

export class CreateEventUsecase implements ICreateEventUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly userRepository: IUserRepository,
    private readonly idService: IIdService
  ) {}

  async execute(params: CreateEventUsecaseParams): Promise<CreateEventUsecaseResult> {
    const groupsPromoting = await Promise.all(
      params.groupsPromoting.map(groupId => this.academicGroupRepository.getById(groupId))
    )
    const groupsInvited = await Promise.all(
      params.groupsInvited.map(groupId => this.academicGroupRepository.getById(groupId))
    )

    new Array(...groupsPromoting, ...groupsInvited).map(academicGroup => {
      if (!academicGroup) throw new EntityNotFound('academic group')
      if (academicGroup.status !== AcademicGroupStatusEnum.Active)
        throw new BusinessLogicError('academic group is no longer active')
    })

    const idEvent = this.idService.generate()
    const idLocation = this.idService.generate()

    const promoters = await Promise.all(params.promoters.map(promoter => this.userRepository.getById(promoter)))
    promoters.map(promoter => {
      if (!promoter) throw new EntityNotFound('promoter')
      if (promoter.role !== UserRoleEnum.Student) throw new BusinessLogicError('promoters must be students')
    })

    const event = new Event({
      id: idEvent,
      date: params.date,
      name: params.name,
      location: {
        ...params.location,
        id: idLocation,
      },
      speakers: params.speakers,
      status: params.status,
      promoters: promoters as Student[],
    })

    await Promise.all(
      groupsPromoting.map(group =>
        this.academicGroupRepository.update({
          ...group,
          promotedEvents: [...group!.promotedEvents, event],
        } as AcademicGroup)
      )
    )

    await Promise.all(
      groupsInvited.map(group =>
        this.academicGroupRepository.update({
          ...group,
          invitedEvents: [...group!.invitedEvents, event],
        } as AcademicGroup)
      )
    )

    return { id: idEvent }
  }
}
