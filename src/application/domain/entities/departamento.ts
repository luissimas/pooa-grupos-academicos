import { v4 as uuid } from 'uuid'

export class Departamento {
  public readonly id: string
  public readonly nome: string
  public readonly sigla: string

  constructor(props: Omit<Departamento, 'id'>, id?: string) {
    Departamento.validaNome(props.nome)

    this.id = id || uuid()
    this.nome = props.nome
    this.sigla = props.sigla
  }

  public static validaNome(nome: string) {
    if (nome.length < 5) {
        throw new InvalidFieldError(nome, 'nome', 'Nome do depto deve conter mais que 5 caracteres')
    }
  }

}