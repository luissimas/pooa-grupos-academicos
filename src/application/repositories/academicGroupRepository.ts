import { AcademicGroup } from '@entities/academicGroup'

export interface IAcademicGroupRepository {
  create: (academicGroup: AcademicGroup) => Promise<void>
  list: (name?: string) => Promise<AcademicGroup[]>
  getById: (id: string) => Promise<AcademicGroup | undefined>
  getByUser: (idUser: string) => Promise<AcademicGroup[]>
  update: (academicGroup: AcademicGroup) => Promise<void>
}
