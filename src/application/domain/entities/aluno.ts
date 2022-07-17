import { Usuario } from '@entities/usuario'
import { Curso } from '@entities/curso'

export class Aluno extends Usuario {
  public readonly ra: number
  public readonly ira: number
  public readonly semestre: number
  public readonly curso: Curso

  constructor(props: Omit<Aluno, 'id'>, id?: string) {
    super(props, id)
    this.ra = props.ra
    this.ira = props.ira
    this.semestre = props.semestre
    this.curso = props.curso
  }
}
