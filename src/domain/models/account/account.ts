export type AccountModel = {
  id: string
  accessToken: string
  date: Date
  name: string
  email: string
  password: string
  phoneNumbers?: phoneNumber[]
}

export type phoneNumber = {
  number: string
  date: Date
}
