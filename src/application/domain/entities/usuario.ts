import { v4 as uuid } from 'uuid'
import { InvalidFieldError } from '@errors'

export abstract class Usuario {
  public readonly id: string
  public readonly nome: string
  public readonly idade: number
  public readonly email: string
  public readonly senha: string

  constructor(props: Omit<Usuario, 'id'>, id?: string) {
    Usuario.validaNome(props.nome)
    Usuario.validaIdade(props.idade)
    Usuario.validaEmail(props.email)
    Usuario.validaSenha(props.senha)

    this.id = id || uuid()
    this.nome = props.nome
    this.idade = props.idade
    this.email = props.email
    this.senha = props.senha
  }

  public static validaNome(nome: string) {
    if (nome.length < 3) {
      throw new InvalidFieldError('nome', 'Nome deve conter mais que 3 caracteres')
    }
  }
  public static validaIdade(idade: number) {
    if (!idade || idade < 0 || idade > 130) {
      throw new InvalidFieldError('idade', 'Idade deve ser maior que 0 e menor que 130')
    }
  }
  public static validaEmail(email: string) {
    if (email.length < 3 || !email.includes('@')) {
      throw new InvalidFieldError('email', 'Endereco de email invalido')
    }
  }
  public static validaSenha(senha: string) {
    if (senha.length < 6) {
      throw new InvalidFieldError('senha', 'A senha deve conter mais que 6 caracteres')
    }
  }
}