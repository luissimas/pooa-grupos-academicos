import { AcademicGroup } from "@entities/academicGroup"
import { IAcademicGroupRepository } from "@repositories/academicGroupRepository"

export class MemoryAcademicGroupRepository implements IAcademicGroupRepository {
  private static academicGroups: AcademicGroup[] = []

  async create(academicGroup: AcademicGroup): Promise<void> {
    MemoryAcademicGroupRepository.academicGroups = [
      ...MemoryAcademicGroupRepository.academicGroups, academicGroup
    ]
  }
  async list(): Promise<AcademicGroup[]> {
    return MemoryAcademicGroupRepository.academicGroups
  }
  async getById(id: string): Promise<AcademicGroup | undefined> {
    return MemoryAcademicGroupRepository.academicGroups.find(group => group.id === id)
  }
}
