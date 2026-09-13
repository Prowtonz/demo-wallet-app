export class FullName {

  readonly firstName: string

  readonly lastName: string

  constructor(firstName: string, lastName: string) {
    firstName = firstName.trim()
    lastName = lastName.trim()
    if(!firstName || !lastName)
      throw new Error('First name and last name cannot be empty.')
    const hasNumbersRegex = /\d/
    if(hasNumbersRegex.test(firstName) || hasNumbersRegex.test(lastName))
      throw new Error('Name must not contain letters.')
    this.firstName = FullName.validateName(firstName)
    this.lastName = FullName.validateName(lastName)
  }

  static fromString(fullName: string): FullName {
    fullName = fullName.trim()
    if(!fullName || !fullName.includes(' '))
      throw new Error('Name must contain both a first name and a last name separated by a space.')
    const parts = fullName.split(/\s+/)
    return new FullName(
      FullName.validateName(parts[0]),
      FullName.validateName(parts[1])
    )
  }

  private static validateName(name: string): string {
    name = name.trim()
    if(!name)
      throw new Error('Name must not be empty.')
    if(/\d/.test(name))
      throw new Error('Name must not contain letters.')
    return name
  }

  toString(): string {
    return `${this.firstName} ${this.lastName}`
  }

}