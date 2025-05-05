export interface TokenCreationRequest {
  callback: string
  checksum: string
  returnType: string
  transactionId: string
}

export interface TokenCreationResponse {
  checksum: string
  transactionId: string
  invoice: string
}

export interface TokenConfirmationRequest {
  checksum: string
  transactionId: string
}

export interface TokenConfirmationResponse {
  bankCode: string
  bank: string
  errorDesc: string
  checksum: string
  errorCode: string
  cardHolder: string
  transactionId: string
  cardNumber: string
  token: string
}
