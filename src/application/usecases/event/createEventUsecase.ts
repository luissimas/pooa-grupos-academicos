import { ClassesEnrollmentStatusEnum } from '@application/dtos/classEnrollment'
import { LibraryReservationStatusEnum } from '@application/dtos/libraryReservation'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IClassEnrollmentRepository } from '@application/repositories/classEnrollmentRepository'
import { IEventRepository } from '@application/repositories/eventRepository'
import { ILibraryReservationRepository } from '@application/repositories/libraryReservationRepository'
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
  date: string
  promoters: string[]
  status: EventStatusEnum
  location: {
    street: string
    number: string
    district: string
    zipCode: string
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
    private readonly eventRepository: IEventRepository,
    private readonly classEnrollmentRepository: IClassEnrollmentRepository,
    private readonly libraryReservationRepository: ILibraryReservationRepository,
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
    await Promise.all(
      promoters.map(async promoter => {
        if (!promoter) throw new EntityNotFound('promoter')
        if (promoter.role !== UserRoleEnum.Student) throw new BusinessLogicError('promoters must be students')

        const classEnrollments = await this.classEnrollmentRepository.listByUser(promoter.id)
        const activeEnrollments = classEnrollments.filter(
          enrollment => enrollment.status === ClassesEnrollmentStatusEnum.Active
        )
        if (activeEnrollments.length < 3)
          throw new BusinessLogicError('promoter must have at least 3 active class enrolments')

        const libraryReservations = await this.libraryReservationRepository.listByUser(promoter.id)
        const pendingReservations = libraryReservations.filter(
          reservation => reservation.status === LibraryReservationStatusEnum.Pending
        )
        if (pendingReservations.length > 0)
          throw new BusinessLogicError('promoter must have no pending library reservations')
      })
    )

    const event = new Event({
      id: idEvent,
      date: new Date(params.date),
      name: params.name,
      location: {
        ...params.location,
        id: idLocation,
      },
      speakers: params.speakers,
      status: params.status,
      promoters: promoters as Student[],
      academicGroupsPromoters: params.groupsPromoting,
      academicGroupsInvited: params.groupsInvited,
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

    await this.eventRepository.create(event)

    return { id: idEvent }
  }
}
