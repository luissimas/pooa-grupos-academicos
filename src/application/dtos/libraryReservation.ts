export interface LibraryReservationDTO {
  id: string
  idUser: string
  status: LibraryReservationStatusEnum
}

export enum LibraryReservationStatusEnum {
  Active = 'active',
  Pending = 'pending',
}
