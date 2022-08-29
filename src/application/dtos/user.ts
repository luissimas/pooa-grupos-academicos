import { CourseDTO } from '@dtos/course'
import { UserRoleEnum } from '@entities/user'

export interface UserDTO {
  id: string
  name: string
  age: number
  email: string
  password: string
  role: UserRoleEnum
}

export interface StudentDTO extends UserDTO {
  ra: number
  ira: number
  semester: number
  course: Omit<CourseDTO, 'id'>
}

export interface ProfessorDTO extends UserDTO {
  researchField: string
  collegiateBody: string
}
