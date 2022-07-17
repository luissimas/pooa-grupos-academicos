import { v4 as uuid } from 'uuid'

export abstract class Usuario {
  public readonly id: string
  public readonly nome: string
  public readonly idade: number
  public readonly email: string

  constructor(props: Omit<Usuario, 'id'>, id?: string) {
    this.id = id || uuid()
    this.nome = props.nome
    this.idade = props.idade
    this.email = props.email
  }
}
