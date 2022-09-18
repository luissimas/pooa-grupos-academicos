import { ClassEnrollmentDTO, ClassesEnrollmentStatusEnum } from '@application/dtos/classEnrollment'
import { IClassEnrollmentRepository } from '@application/repositories/classEnrollmentRepository'
import axios from 'axios'
import { v4 as uuid } from 'uuid'

// Loading dotenv config
import 'dotenv/config'

type ListByUserRouteResult = number

export class ApiClassEnrollmentRepository implements IClassEnrollmentRepository {
  private static instance: ApiClassEnrollmentRepository

  private readonly axios

  private constructor() {
    if (!process.env.CLASS_ENROLLMENT_API_BASE_URL) throw new Error('Class enrollment api base url not found')

    this.axios = axios.create({
      baseURL: process.env.CLASS_ENROLLMENT_API_BASE_URL,
    })
  }

  public static getInstance(): ApiClassEnrollmentRepository {
    if (!ApiClassEnrollmentRepository.instance)
      ApiClassEnrollmentRepository.instance = new ApiClassEnrollmentRepository()

    return ApiClassEnrollmentRepository.instance
  }

  async listByUser(idUser: string): Promise<ClassEnrollmentDTO[]> {
    const result: ListByUserRouteResult = (await this.axios.get(`aluno/${idUser}/disciplinas`)).data

    const enrollments = new Array(result).fill(undefined).map(() => ({
      id: uuid(),
      idUser,
      status: ClassesEnrollmentStatusEnum.Active,
    }))

    return enrollments
  }
}
