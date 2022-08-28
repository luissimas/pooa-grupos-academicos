import { InvalidFieldError } from '@errors'

export class Department {
  public readonly id: string
  public readonly name: string
  public readonly abbreviation: string

  constructor(props: Department) {
    Department.validateName(props.name)

    this.id = props.id
    this.name = props.name
    this.abbreviation = props.abbreviation
  }

  public static validateName(name: string) {
    if (name.length < 5) {
      throw new InvalidFieldError('nome', 'Nome do depto deve conter mais que 5 caracteres')
    }
  }
}
