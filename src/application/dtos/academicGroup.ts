import { AcademicGroupStatusEnum } from "@entities/academicGroup"
import { DepartmentDTO } from "@dtos/department"
import { StudentDTO, UserDTO } from "@dtos/user"
import { RecruitmentProcessDTO } from "@dtos/recruitmentProcess"
import { EventDTO } from "@dtos/event"


export interface AcademicGroupDTO {
  id: string
  name: string
  description: string
  foundationDate: Date
  status: AcademicGroupStatusEnum
  department: DepartmentDTO
  sponsor: UserDTO
  members: StudentDTO[]
  maxMembers: number
  promotedEvents: EventDTO[]
  invitedEvents: EventDTO[]
  recruitmentProcesses: RecruitmentProcessDTO[]
}
