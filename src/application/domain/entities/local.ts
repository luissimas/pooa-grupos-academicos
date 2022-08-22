import { v4 as uuid } from 'uuid'

export class Local {
  public readonly id: string
  public readonly rua: string
  public readonly numero: string
  public readonly bairro: string
  public readonly cep: number
  public readonly complemento: string
  public readonly pontoDeReferencia: string

  constructor(props: Omit<Local, 'id'>, id?: string) {
    this.id = id || uuid()
    this.rua = props.rua
    this.numero = props.numero
    this.bairro = props.bairro
    this.cep = props.cep
    this.complemento = props.complemento
    this.pontoDeReferencia = props.pontoDeReferencia
  }
}
