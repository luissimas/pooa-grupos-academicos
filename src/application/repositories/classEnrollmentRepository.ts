import { ClassEnrollmentDTO } from '@application/dtos/classEnrollment'

export interface IClassEnrollmentRepository {
  listByUser(idUser: string): Promise<ClassEnrollmentDTO[]>
}
