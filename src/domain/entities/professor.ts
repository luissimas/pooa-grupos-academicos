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

  public static validateResearchField(researchField: string) {
    if (researchField.length === 0) {
      throw new InvalidFieldError('researchField', 'researchField must contain at least 1 character')
    }
  }

  public static validateCollegiateBody(collegiateBody: string) {
    if (collegiateBody.length === 0) {
      throw new InvalidFieldError('collegiateBody', 'collegiateBody must contain at least 1 character')
    }
  }
}
