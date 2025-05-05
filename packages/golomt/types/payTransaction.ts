export interface PayTransactionRequest {
  amount: string
  checksum: string
  transactionId: string
  lang: string
  token: string
}

export interface PayTransactionResponse {
  amount: string
  errorDesc: string
  checksum: string
  errorCode: string
  cardNumber: string
  transactionId: string
}
