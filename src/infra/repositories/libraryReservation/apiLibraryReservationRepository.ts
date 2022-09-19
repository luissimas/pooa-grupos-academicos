import axios from 'axios'
import { v4 as uuid } from 'uuid'

// Loading dotenv config
import 'dotenv/config'
import { ILibraryReservationRepository } from '@application/repositories/libraryReservationRepository'
import { LibraryReservationDTO, LibraryReservationStatusEnum } from '@application/dtos/libraryReservation'

type ListByUserRouteResult = Boolean

export class ApiLibraryReservationRepository implements ILibraryReservationRepository {
  private static instance: ApiLibraryReservationRepository

  private readonly axios

  private constructor() {
    if (!process.env.LIBRARY_RESERVATION_API_BASE_URL) throw new Error('Library reservation api base url not found')

    this.axios = axios.create({
      baseURL: process.env.LIBRARY_RESERVATION_API_BASE_URL,
    })
  }

  public static getInstance(): ApiLibraryReservationRepository {
    if (!ApiLibraryReservationRepository.instance)
      ApiLibraryReservationRepository.instance = new ApiLibraryReservationRepository()

    return ApiLibraryReservationRepository.instance
  }

  async listByUser(idUser: string): Promise<LibraryReservationDTO[]> {
    const result: ListByUserRouteResult = (await this.axios.get(`pessoa/pendencias/${idUser}`)).data

    const reservations = result ? [{ id: uuid(), idUser, status: LibraryReservationStatusEnum.Pending }] : []

    return reservations
  }
}
