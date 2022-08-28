import { User } from '@entities/user'
import { InvalidFieldError } from '@errors'

export class Professor extends User {
  public readonly researchField: string
  public readonly collegiateBody: string

  constructor(props: Professor) {
    Professor.validateResearchField(props.researchField)
    Professor.validateCollegiateBody(props.collegiateBody)

    super(props)
    this.researchField = props.researchField
    this.collegiateBody = props.collegiateBody
  }

  public static validateResearchField(linhaPesquisa: string) {
    if (linhaPesquisa.length === 0) {
      throw new InvalidFieldError('linhaPesquisa', 'Professor deve possuir linha de pesquisa')
    }
  }

  public static validateCollegiateBody(orgaoColegiado: string) {
    if (orgaoColegiado.length === 0) {
      throw new InvalidFieldError('orgaoColegiado', 'Professor deve ter orgao colegiado')
    }
  }
}
