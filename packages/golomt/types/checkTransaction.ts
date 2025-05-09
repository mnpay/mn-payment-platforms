export interface CheckTransactionRequest {
  transactionId: string
  checksum?: string
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
