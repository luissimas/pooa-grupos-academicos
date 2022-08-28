export enum LibraryReservationStatusEnum {}

export interface LibraryReservationDTO {
  id: string
  idUser: string
  status: LibraryReservationStatusEnum
}
