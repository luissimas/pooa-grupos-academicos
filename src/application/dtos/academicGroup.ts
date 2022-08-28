import { AcademicGroupStatusEnum } from "@entities/academicGroup"
import { DepartmentDTO } from "@dtos/department"
import { StudentDTO, UserDTO } from "@dtos/user"
import { RecruitmentProcessDTO } from "@dtos/recruitmentProcess"


export interface AcademicGroupDTO {
  id: string
  name: string
  description: string
  foundationDate: Date
  status: AcademicGroupStatusEnum
  department: DepartmentDTO
  responsible: UserDTO
  members: StudentDTO
  maxMembers: number
  organizedEvents: number
  invitedEvents: number
  selectiveProcesses: RecruitmentProcessDTO
}
