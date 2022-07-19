import { v4 as uuid } from 'uuid'

export class Curso {
  public readonly id: string
  public readonly nome: string
  public readonly sigla: string

  constructor(props: Omit<Curso, 'id'>, id?: string) {
    Curso.validaNome(props.nome)

    this.id = id || uuid()
    this.nome = props.nome
    this.sigla = props.sigla
  }

  public static validaNome(nome: string) {
    if (nome.length < 3) {
        throw new InvalidFieldError(nome, 'nome', 'Nome do curso deve conter mais que 3 caracteres')
    }
  }

}