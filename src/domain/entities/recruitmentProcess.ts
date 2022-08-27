import { InvalidFieldError } from '@errors'

export class RecruitmentProcess {
  public readonly id: string
  public readonly date: Date
  public readonly enrolled: number
  public readonly openings: number
  public readonly entrants: number
  public readonly stages: number

  constructor(props: RecruitmentProcess) {
    RecruitmentProcess.valdiateEnrolled(props.enrolled)
    RecruitmentProcess.validateOpenings(props.openings)
    RecruitmentProcess.validateEntrants(props.entrants)
    RecruitmentProcess.validateStages(props.stages)

    this.id = props.id
    this.date = props.date
    this.enrolled = props.enrolled
    this.openings = props.openings
    this.entrants = props.entrants
    this.stages = props.stages
  }

  public static valdiateEnrolled(enrolled: number) {
    if (enrolled < 0) {
      throw new InvalidFieldError('noInscritos', 'Não pode haver negativos inscritos no PS')
    }
  }

  public static validateOpenings(openings: number) {
    if (openings < 1) {
      throw new InvalidFieldError('noVagas', 'PS deve haver pelo menos uma vaga')
    }
  }

  public static validateEntrants(entrants: number) {
    if (entrants < 1) {
      throw new InvalidFieldError('noVagas', 'PS deve haver pelo menos uma vaga')
    }
  }

  public static validateStages(stages: number) {
    if (stages < 1) {
      throw new InvalidFieldError('noVagas', 'PS deve haver pelo menos uma vaga')
    }
  }
}
