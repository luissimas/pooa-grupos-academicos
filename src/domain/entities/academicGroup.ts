import { Student } from '@entities/student'
import { Department } from '@entities/department'
import { User } from '@entities/user'
import { Event } from '@entities/event'
import { RecruitmentProcess } from '@entities/recruitmentProcess'
import { InvalidFieldError } from '@errors'

export enum AcademicGroupStatusEnum {
  Active = 'active',
  Inactive = 'inactive',
}

export class AcademicGroup {
  public readonly id: string
  public readonly name: string
  public readonly description: string
  public readonly foundationDate: Date
  public readonly status: AcademicGroupStatusEnum
  public readonly department: Department
  public readonly sponsor: User
  public readonly members: Student[]
  public readonly maxMembers: number
  public readonly promotedEvents: Event[]
  public readonly invitedEvents: Event[]
  public readonly recruitmentProcesses: RecruitmentProcess[]

  constructor(props: AcademicGroup) {
    AcademicGroup.validateName(props.name)
    AcademicGroup.validateDescription(props.description)
    AcademicGroup.validateSponsor(props.sponsor)
    AcademicGroup.validateMembers(props.members)
    AcademicGroup.validateMaxMembers(props.maxMembers)

    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.foundationDate = props.foundationDate
    this.status = props.status
    this.department = props.department
    this.sponsor = props.sponsor
    this.members = props.members
    this.maxMembers = props.maxMembers
    this.promotedEvents = props.promotedEvents
    this.invitedEvents = props.invitedEvents
    this.recruitmentProcesses = props.recruitmentProcesses
  }

  public static validateName(name: string) {
    if (name.length < 2) {
      throw new InvalidFieldError('name', 'name must contain at least 3 caracters')
    }
  }

  public static validateDescription(description: string) {
    if (description.length < 3) {
      throw new InvalidFieldError('description', 'description must contain at least 4 caracters')
    }
  }

  public static validateSponsor(sponsor: User) {
    if (!sponsor) {
      throw new InvalidFieldError('sponsor', 'academic group must have a sponsor')
    }
  }

  public static validateMembers(members: Student[]) {
    if (members.length === 0) {
      throw new InvalidFieldError('members', 'academic group must have at least 1 member')
    }
  }

  public static validateMaxMembers(maxMembers: number) {
    if (maxMembers < 1) {
      throw new InvalidFieldError('maxMembers', 'maxMembers must be at least 1')
    }
  }
}
