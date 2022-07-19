import { Usuario } from '@entities/usuario'
import { Curso } from '@entities/curso'

export class Aluno extends Usuario {
  public readonly ra: number
  public readonly ira: number
  public readonly semestre: number
  public readonly curso: Curso

  constructor(props: Omit<Aluno, 'id'>, id?: string) {
    Aluno.validaRA(props.ra)
    Aluno.validaIRA(props.ira)

    super(props, id)
    this.ra = props.ra
    this.ira = props.ira
    this.semestre = props.semestre
    this.curso = props.curso
  }

  public static validaRA(ra: number) {
    if (ra < 0 || ra > 1000000) {
      throw new InvalidFieldError(ra, 'ra', 'RA deve ser um numero entre 0 e 1000000')
    }
  }

  public static validaIRA(ira: number) {
    if (ira < 0 || ira > 20000) {
      throw new InvalidFieldError(ira, 'ira', 'IRA deve ser um numero entre 0 e 20000')
    }
  }
}
