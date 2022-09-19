import { LibraryReservationDTO } from '@application/dtos/libraryReservation'

export interface ILibraryReservationRepository {
  listByUser(idUser: string): Promise<LibraryReservationDTO[]>
}
