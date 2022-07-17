import { Usuario } from '@entities/usuario'

export class Professor extends Usuario {
  public readonly linhaPesquisa: string
  public readonly orgaoColegiado: string

  constructor(props: Omit<Professor, 'id'>, id?: string) {
    super(props, id)
    this.linhaPesquisa = props.linhaPesquisa
    this.orgaoColegiado = props.orgaoColegiado
  }
}
