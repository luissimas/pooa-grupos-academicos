import { InvalidFieldError } from '@errors'

export enum UserRoleEnum {
  Student = 'student',
  Professor = 'professor',
}

export abstract class User {
  public readonly id: string
  public readonly name: string
  public readonly age: number
  public readonly email: string
  public readonly password: string
  public readonly role: UserRoleEnum

  constructor(props: User) {
    User.validateName(props.name)
    User.validateAge(props.age)
    User.validateEmail(props.email)
    User.validatePassword(props.password)

    this.id = props.id
    this.name = props.name
    this.age = props.age
    this.email = props.email
    this.password = props.password
    this.role = props.role
  }

  public static validateName(name: string) {
    if (name.length < 3) {
      throw new InvalidFieldError('nome', 'Nome deve conter mais que 3 caracteres')
    }
  }
  public static validateAge(age: number) {
    if (!age || age < 0 || age > 130) {
      throw new InvalidFieldError('idade', 'Idade deve ser maior que 0 e menor que 130')
    }
  }
  public static validateEmail(email: string) {
    if (email.length < 3 || !email.includes('@')) {
      throw new InvalidFieldError('email', 'Endereco de email invalido')
    }
  }
  public static validatePassword(password: string) {
    if (password.length < 6) {
      throw new InvalidFieldError('senha', 'A senha deve conter mais que 6 caracteres')
    }
  }
}
