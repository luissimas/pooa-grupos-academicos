import { v4 as uuid } from 'uuid'
import { Aluno } from '@entities/aluno'
import { Departamento } from '@entities/departamento'
import { Usuario } from '@entities/usuario'
import { Evento } from '@entities/evento'
import { ProcessoSeletivo } from '@entities/processoSeletivo'

export enum GrupoAcademicoStatusEnum {
  ATIVO,
  DESATIVADO,
}

export class GrupoAcademico {
  public readonly id: string
  public readonly nome: string
  public readonly descricao: string
  public readonly dataFundacao: Date
  public readonly status: GrupoAcademicoStatusEnum
  public readonly departamento: Departamento
  public readonly responsavel: Usuario
  public readonly membros: Aluno[]
  public readonly maxMembros: number
  public readonly eventosOrganizados: Evento[]
  public readonly eventosConvidados: Evento[]
  public readonly processosRealizados: ProcessoSeletivo[]

  constructor(props: Omit<GrupoAcademico, 'id'>, id?: string) {
    GrupoAcademico.validaNome(props.nome)
    GrupoAcademico.validaDescricao(props.descricao)
    GrupoAcademico.validaResponsavel(props.responsavel)
    GrupoAcademico.validaMembros(props.membros)
    GrupoAcademico.validaMaxMembros(props.maxMembros)

    this.id = id || uuid()
    this.nome = props.nome
    this.descricao = props.descricao
    this.dataFundacao = props.dataFundacao
    this.status = props.status
    this.departamento = props.departamento
    this.responsavel = props.responsavel
    this.membros = props.membros
    this.maxMembros = props.maxMembros
    this.eventosOrganizados = props.eventosOrganizados
    this.eventosConvidados = props.eventosConvidados
    this.processosRealizados = props.processosRealizados
  }

  public static validaNome(nome: string) {
    if (nome.length < 2) {
      throw new InvalidFieldError(nome, 'nome', 'Nome do grupo academico deve ter mais que 2 caracteres')
    }
  }

  public static validaDescricao(descricao: string) {
    if (descricao.length < 3) {
      throw new InvalidFieldError(descricao, 'descricao', 'Descricao do grupo deve ter mais que 3 caracteres')
    }
  }

  public static validaResponsavel(responsavel: Usuario) {
    if (!responsavel) {
      throw new InvalidFieldError(responsavel, 'responsavel', 'Grupo deve ter um responsavel')
    }
  }
  
  public static validaMembros(membros: Aluno[]) {
    if (membros.length === 0) {
      throw new InvalidFieldError(membros, 'membros', 'Grupo deve ter pelo menos um membro')
    }
  }

  public static validaMaxMembros(maxMembros: number) {
    if (maxMembros < 1) {
      throw new InvalidFieldError(maxMembros, 'maxMembros', 'Máximo de membros do grupo não pode ser menor que 1')
    }
  }
}
