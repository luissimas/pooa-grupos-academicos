import { v4 as uuid } from 'uuid'

export class Curso {
  public readonly id: string
  public readonly nome: string
  public readonly sigla: string

  constructor(props: Omit<Curso, 'id'>, id?: string) {
    this.id = id || uuid()
    this.nome = props.nome
    this.sigla = props.sigla
  }
}
