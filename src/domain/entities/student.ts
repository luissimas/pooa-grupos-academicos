import { User } from '@entities/user'
import { Course } from '@entities/course'
import { InvalidFieldError } from '@errors'

export class Student extends User {
  public readonly ra: number
  public readonly ira: number
  public readonly semester: number
  public readonly course: Course

  constructor(props: Student) {
    Student.validateRa(props.ra)
    Student.validateIra(props.ira)

    super(props)
    this.ra = props.ra
    this.ira = props.ira
    this.semester = props.semester
    this.course = props.course
  }

  public static validateRa(ra: number) {
    if (ra < 0 || ra > 1000000) {
      throw new InvalidFieldError('ra', 'RA deve ser um numero entre 0 e 1000000')
    }
  }

  public static validateIra(ira: number) {
    if (ira < 0 || ira > 20000) {
      throw new InvalidFieldError('ira', 'IRA deve ser um numero entre 0 e 20000')
    }
  }
}
