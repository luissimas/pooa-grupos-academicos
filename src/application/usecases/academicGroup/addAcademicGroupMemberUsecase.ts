import { ClassesEnrollmentStatusEnum } from '@application/dtos/classEnrollment'
import { IAcademicGroupRepository } from '@application/repositories/academicGroupRepository'
import { IClassEnrollmentRepository } from '@application/repositories/classEnrollmentRepository'
import { IUserRepository } from '@application/repositories/userRepository'
import { AcademicGroup, AcademicGroupStatusEnum } from '@domain/entities/academicGroup'
import { Student } from '@domain/entities/student'
import { UserRoleEnum } from '@domain/entities/user'
import { BusinessLogicError, EntityNotFound } from '@domain/errors'
import { IUsecase } from '..'

export type AddAcademicGroupMemberUsecaseParams = {
  academicGroupId: string
  studentId: string
}

export interface IAddAcademicGroupMemberUsecase extends IUsecase<AddAcademicGroupMemberUsecaseParams, void> {}

export class AddAcademicGroupMemberUsecase implements IAddAcademicGroupMemberUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly userRepository: IUserRepository,
    private readonly classEnrolmentRepository: IClassEnrollmentRepository
  ) {}

  async execute(params: AddAcademicGroupMemberUsecaseParams): Promise<void> {
    const academicGroup = await this.academicGroupRepository.getById(params.academicGroupId)

    // Validating academic group state
    if (!academicGroup) throw new EntityNotFound('academic group')
    if (academicGroup.status !== AcademicGroupStatusEnum.Active)
      throw new BusinessLogicError('academic group is no longer active')
    if (academicGroup.members.length >= academicGroup.maxMembers)
      throw new BusinessLogicError('academic group is already at max member capacity')

    const student = await this.userRepository.getById(params.studentId)

    // Validating student state
    if (!student) throw new EntityNotFound('student')
    if (student.role !== UserRoleEnum.Student) throw new BusinessLogicError('user is not a student')
    if (academicGroup.members.find(member => member.id === student.id))
      throw new BusinessLogicError('student already is a member of this academic group')

    const classEnrollments = await this.classEnrolmentRepository.listByUser(params.studentId)
    const activeEnrollments = classEnrollments.filter(
      enrollment => enrollment.status === ClassesEnrollmentStatusEnum.Active
    )
    if (activeEnrollments.length < 3)
      throw new BusinessLogicError('student must have at least 3 active class enrolments')

    // Updating academic group
    const newAcademicGroup = new AcademicGroup({
      ...academicGroup,
      members: [...academicGroup.members, student as Student],
    })
    await this.academicGroupRepository.update(newAcademicGroup)
  }
}
