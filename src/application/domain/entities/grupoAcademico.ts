import { v4 as uuid } from 'uuid'
import { Aluno } from '@entities/aluno'
import { Departamento } from '@entities/departamento'
import { Usuario } from '@entities/usuario'
import { Evento } from '@entities/evento'

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
}
