import { AcademicGroup } from "@entities/academicGroup"
import { IAcademicGroupRepository } from "@repositories/academicGroupRepository"

export class MemoryAcademicUserRepository implements IAcademicGroupRepository {
  private static academicGroups: AcademicGroup[] = []

  async create(academicGroup: AcademicGroup): Promise<void> {
    MemoryAcademicUserRepository.academicGroups = [
      ...MemoryAcademicUserRepository.academicGroups, academicGroup
    ]
  }
  async list(): Promise<AcademicGroup[]> {
    return MemoryAcademicUserRepository.academicGroups
  }
  async getById(id: string): Promise<AcademicGroup | undefined> {
    return MemoryAcademicUserRepository.academicGroups.find(group => group.id === id)
  }
}
