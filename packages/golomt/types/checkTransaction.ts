export interface CheckTransactionRequest {
  checksum: string
  transactionId: string
}

export interface CheckTransactionResponse {
  amount: string
  errorDesc: string
  checksum: string
  errorCode: string
  transactionId: string
  cardNumber: string
  token?: string // Optional, as token may not be present
}
