import { AcademicGroup } from '@entities/academicGroup'

export interface IAcademicGroupRepository {
  create: (academicGroup: AcademicGroup) => Promise<void>
  list: () => Promise<AcademicGroup[]>
  getById: (id: string) => Promise<AcademicGroup | undefined>
  getByUser: (idUser: string) => Promise<AcademicGroup[]>
}
