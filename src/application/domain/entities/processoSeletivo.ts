import { v4 as uuid } from 'uuid'

export class ProcessoSeletivo {
  public readonly id: string
  public readonly data: Date
  public readonly noInscritos: number
  public readonly noVagas: number
  public readonly noIngressantes: number
  public readonly etapas: number

  constructor(props: Omit<ProcessoSeletivo, 'id'>, id?: string) {
    ProcessoSeletivo.validaNoInscritos(props.noInscritos)
    ProcessoSeletivo.validaNoVagas(props.noVagas)

    this.id = id || uuid()
    this.data = props.data
    this.noInscritos = props.noInscritos
    this.noVagas = props.noVagas
    this.noIngressantes = props.noIngressantes
    this.etapas = props.etapas
  }

  public static validaNoInscritos(noInscritos: number) {
    if (noInscritos < 0) {
      throw new InvalidFieldError(noInscritos, 'noInscritos', 'Não pode haver negativos inscritos no PS')
    }
  }

  public static validaNoVagas(noVagas: number) {
    if (noVagas < 1) {
      throw new InvalidFieldError(noVagas, 'noVagas', 'PS deve haver pelo menos uma vaga')
    }
  }
}
