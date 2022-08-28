import { Student } from '@entities/student'
import { Location } from '@entities/location'
import { InvalidFieldError } from '@errors'

export enum EventStatusEnum {
  Future = 'future',
  Occuring = 'occuring',
  Canceled = 'canceled',
}

export class Event {
  public readonly id: string
  public readonly name: string
  public readonly date: Date
  public readonly promoters: Student[]
  public readonly status: EventStatusEnum
  public readonly location: Location
  public readonly speakers: string[]

  constructor(props: Event) {
    Event.validateName(props.name)
    Event.validatePromoters(props.promoters)

    this.id = props.id
    this.name = props.name
    this.date = props.date
    this.promoters = props.promoters
    this.status = props.status
    this.location = props.location
    this.speakers = props.speakers
  }

  public static validateName(name: string) {
    if (name.length < 0) {
      throw new InvalidFieldError('nome', 'Nome do evento não pode ser vazio')
    }
  }

  public static validatePromoters(promoters: Student[]) {
    if (promoters.length < 1 || promoters.length > 10) {
      throw new InvalidFieldError('organizadores', 'Quantidade de organizadores do evento deve estar entre 1 e 10')
    }
  }
}
