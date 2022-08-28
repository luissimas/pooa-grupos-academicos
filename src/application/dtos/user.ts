import { CursoDTO } from '@dtos/curso'
import { UsuarioTipoEnum } from '@entities/usuario'

export interface UsuarioDTO {
  nome: string
  idade: number
  email: string
  senha: string
  tipo: UsuarioTipoEnum
}

export interface AlunoDTO extends UsuarioDTO {
  ra: number
  ira: number
  semestre: number
  curso: CursoDTO
}

export interface ProfessorDTO extends UsuarioDTO {
  linhaPesquisa: string
  orgaoColegiado: string
}
