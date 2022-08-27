import { InvalidFieldError } from '@errors'

export class Course {
  public readonly id: string
  public readonly name: string
  public readonly abbreviation: string

  constructor(props: Course) {
    Course.validateName(props.name)
    Course.validateAbbreviation(props.abbreviation)

    this.id = props.id
    this.name = props.name
    this.abbreviation = props.abbreviation
  }

  public static validateName(name: string) {
    if (name.length < 3) {
      throw new InvalidFieldError('nome', 'Nome do curso deve conter mais que 3 caracteres')
    }
  }

  public static validateAbbreviation(abbreviation: string) {
    if (abbreviation.length < 2) {
      throw new InvalidFieldError('nome', 'Nome do curso deve conter mais que 3 caracteres')
    }
  }
}
