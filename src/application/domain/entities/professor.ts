import { Usuario } from '@entities/usuario'

export class Professor extends Usuario {
  public readonly linhaPesquisa: string
  public readonly orgaoColegiado: string

  constructor(props: Omit<Professor, 'id'>, id?: string) {
    Professor.validaLinhaPesquisa(props.linhaPesquisa)
    Professor.validaOrgaoColegiado(props.orgaoColegiado)

    super(props, id)
    this.linhaPesquisa = props.linhaPesquisa
    this.orgaoColegiado = props.orgaoColegiado
  }

  public static validaLinhaPesquisa(linhaPesquisa: string) {
    if (linhaPesquisa.length === 0) {
        throw new InvalidFieldError(linhaPesquisa, 'linhaPesquisa', 'Professor deve possuir linha de pesquisa')
    }
  }

  public static validaOrgaoColegiado(orgaoColegiado: string) {
    if (orgaoColegiado.length === 0) {
        throw new InvalidFieldError(orgaoColegiado, 'orgaoColegiado', 'Professor deve ter orgao colegiado')
    }
  }

}