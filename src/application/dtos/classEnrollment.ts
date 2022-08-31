export interface ClassEnrolmentDTO {
  id: string
  idUser: string
  status: ClassesEnrolmentStatusEnum
}

export enum ClassesEnrolmentStatusEnum {
  Active = 'active',
  Inactive = 'inactive',
}
