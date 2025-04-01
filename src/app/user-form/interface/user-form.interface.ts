export interface User {
  name: string,
  gender: string,
  email: string,
  birthday: Date | null,
  id: string,
  registerDate: Date
}

export interface UserForm {
  name: string,
  gender: string,
  email: string,
  birthday: Date | null,
}
