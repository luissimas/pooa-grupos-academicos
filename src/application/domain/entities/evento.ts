import { v4 as uuid } from 'uuid'
import { Aluno } from '@entities/aluno'
import { Local } from '@entities/local'

export enum EventoStatusEnum {
  A_ACONTECER,
  ACONTECENDO,
  CANCELADO,
}

export class Evento {
  public readonly id: string
  public readonly nome: string
  public readonly data: Date
  public readonly organizadores: Aluno[]
  public readonly status: EventoStatusEnum
  public readonly local: Local
  public readonly palestrantes: string[]

  constructor(props: Omit<Evento, 'id'>, id?: string) {
    Evento.validaNome(props.nome)
    Evento.validaOrganizadores(props.organizadores)

    this.id = id || uuid()
    this.nome = props.nome
    this.data = props.data
    this.organizadores = props.organizadores
    this.status = props.status
    this.local = props.local
    this.palestrantes = props.palestrantes
  }

  public static validaNome(nome: string) {
    if (nome.length < 0) {
        throw new InvalidFieldError(nome, 'nome', 'Nome do evento não pode ser vazio')
    }
  }

  public static validaOrganizadores(organizadores: Aluno[]) {
    if (organizadores.length < 1 || organizadores.length > 10) {
        throw new InvalidFieldError(organizadores, 'organizadores', 'Quantidade de organizadores do evento deve estar entre 1 e 10')
    }
  }

}