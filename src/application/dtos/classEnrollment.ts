export interface ClassEnrollmentDTO {
  id: string
  idUser: string
  status: ClassesEnrollmentStatusEnum
}

export enum ClassesEnrollmentStatusEnum {
  Active = 'active',
  Inactive = 'inactive',
}
