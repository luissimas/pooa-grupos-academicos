import { IAcademicGroupRepository } from "@repositories/academicGroupRepository"
import { UserDTO } from "@dtos/user"
import { AcademicGroupDTO } from "@dtos/academicGroup"
import { IUsecase } from "@usecases"
import { IIdService } from "@services/id"
import { AcademicGroup } from "@entities/academicGroup"
import { userInfo } from "os"
import { UserRoleEnum } from "@entities/user"
import { UnauthorizedError } from "@domain/errors"

export type CreateAcademicGroupUsecaseParams = {
  user: UserDTO,
  academicGroup: AcademicGroupDTO
}

export type CreateAcademicGroupUsecaseResult = {
  id: string
}

export interface ICreateAcademicGroupUsecase extends IUsecase<
  CreateAcademicGroupUsecaseParams,
  CreateAcademicGroupUsecaseResult
> {}

export class CreateAcademicGroupUsecase implements ICreateAcademicGroupUsecase {
  constructor(
    private readonly academicGroupRepository: IAcademicGroupRepository,
    private readonly idService: IIdService,
  ) {}

  async execute(
    params: CreateAcademicGroupUsecaseParams
  ): Promise<CreateAcademicGroupUsecaseResult> {

    if (params.user.role !== UserRoleEnum.Professor) {
      throw new UnauthorizedError('Permissão insuficiente para criar grupo')
    }

    const id = this.idService.generate()

    const academicGroup = new AcademicGroup(
      { ...params.academicGroup, id } as unknown as AcademicGroup
    )

    this.academicGroupRepository.create(academicGroup)
    return { id }
  }
}
