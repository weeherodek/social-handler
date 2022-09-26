
export type AddPhoneNumberAccountParams = {
  accountId: string
  phoneNumber: string
}

export interface AddPhoneNumberAccount {
  addPhoneNumber: (data: AddPhoneNumberAccountParams) => Promise<void>
}
