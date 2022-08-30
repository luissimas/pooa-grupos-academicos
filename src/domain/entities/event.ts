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
      throw new InvalidFieldError('name', 'name must contain at least 1 character')
    }
  }

  public static validatePromoters(promoters: Student[]) {
    if (promoters.length < 1 || promoters.length > 10) {
      throw new InvalidFieldError('promoters', 'promoters must be an array containing 1 up to 10 elements')
    }
  }
}
