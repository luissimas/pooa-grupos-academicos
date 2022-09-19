export class Location {
  public readonly id: string
  public readonly street: string
  public readonly number: string
  public readonly district: string
  public readonly zipCode: string
  public readonly complement: string
  public readonly referencePoint: string

  constructor(props: Location) {
    this.id = props.id
    this.street = props.street
    this.number = props.number
    this.district = props.district
    this.zipCode = props.zipCode
    this.complement = props.complement
    this.referencePoint = props.referencePoint
  }
}
