import { Aluno } from '@entities/aluno'
import { Curso } from '@entities/curso'
import { Professor } from '@entities/professor'
import { UsuarioTipoEnum } from '@entities/usuario'
import { IUserRepository } from '@repositories/userRepository'
import { IIdService } from '@services/id'
import { IPasswordService } from '@services/password'
import { IUsecase } from '..'

export type AlunoDTO = {
  nome: string
  idade: number
  email: string
  senha: string
  tipo: UsuarioTipoEnum
  ra: number
  ira: number
  semestre: number
  curso: Curso
}

export type ProfessorDTO = {
  nome: string
  idade: number
  email: string
  senha: string
  tipo: UsuarioTipoEnum
  linhaPesquisa: string
  orgaoColegiado: string
}

export type CreateUserUsecaseParams = AlunoDTO | ProfessorDTO

export type CreateUserUsecaseResult = {
  id: string
}

export interface ICreateUserUsecase extends IUsecase<CreateUserUsecaseParams, CreateUserUsecaseResult> {}

export class CreateUserUsecase implements ICreateUserUsecase {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly idService: IIdService,
    private readonly passwordService: IPasswordService
  ) {}

  async execute(params: CreateUserUsecaseParams): Promise<CreateUserUsecaseResult> {
    const id = this.idService.generate()
    const hashedPassword = await this.passwordService.hashPassword(params.senha)

    const user =
      params.tipo === UsuarioTipoEnum.Aluno
        ? new Aluno({ ...params, senha: hashedPassword } as AlunoDTO, id)
        : new Professor({ ...params, senha: hashedPassword } as ProfessorDTO, id)

    this.userRepository.create(user)

    return { id }
  }
}
