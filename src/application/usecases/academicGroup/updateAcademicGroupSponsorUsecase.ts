import { ClassesEnrollmentStatusEnum } from '@application/dtos/classEnrollment'
import { LibraryReservationStatusEnum } from '@application/dtos/libraryReservation'
import { UserDTO } from '@application/dtos/user'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IClassEnrollmentRepository } from '@application/repositories/classEnrollmentRepository'
import { ILibraryReservationRepository } from '@application/repositories/libraryReservationRepository'
import { IUserRepository } from '@application/repositories/userRepository'
import { AcademicGroupStatusEnum } from '@domain/entities/academicGroup'
import { BusinessLogicError, EntityNotFound, ForbiddenError } from '@domain/errors'
import { IUsecase } from '..'

export type UpdateAcademicGroupSponsorUsecaseParams = {
  user: UserDTO
  academicGroupId: string
  sponsorId: string
}

export interface IUpdateAcademicGroupSponsorUsecase extends IUsecase<UpdateAcademicGroupSponsorUsecaseParams, void> {}

export class UpdateAcademicGroupSponsorUsecase implements IUpdateAcademicGroupSponsorUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly userRepository: IUserRepository,
    private readonly classEnrollmentRepository: IClassEnrollmentRepository,
    private readonly libraryReservationRepository: ILibraryReservationRepository
  ) {}

  async execute(params: UpdateAcademicGroupSponsorUsecaseParams): Promise<void> {
    const academicGroup = await this.academicGroupRepository.getById(params.academicGroupId)

    if (!academicGroup) throw new EntityNotFound('academic group')

    if (params.user.id !== academicGroup.sponsor.id)
      throw new ForbiddenError('an academic group sponsor can be update only by the current sponsor')

    if (academicGroup.status !== AcademicGroupStatusEnum.Active)
      throw new BusinessLogicError('academic group is not currently active')

    const sponsor = await this.userRepository.getById(params.sponsorId)

    if (!sponsor) throw new EntityNotFound('user')

    const classEnrollments = await this.classEnrollmentRepository.listByUser(params.sponsorId)
    const activeEnrollments = classEnrollments.filter(
      enrollment => enrollment.status === ClassesEnrollmentStatusEnum.Active
    )

    const libraryReservations = await this.libraryReservationRepository.listByUser(params.sponsorId)
    const pendingReservations = libraryReservations.filter(
      reservation => reservation.status === LibraryReservationStatusEnum.Pending
    )
    if (pendingReservations.length > 0)
      throw new BusinessLogicError('new sponsor must have no pending library reservations')

    if (activeEnrollments.length < 1)
      throw new BusinessLogicError('new sponsor must have at least 1 active class enrolment')

    await this.academicGroupRepository.update({ ...academicGroup, sponsor })
  }
}
