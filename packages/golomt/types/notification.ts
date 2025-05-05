export interface NotificationPayload {
  amount: string
  bank: string
  errorDesc: string
  checksum: string
  errorCode: string
  cardHolder: string
  transactionId: string
  cardNumber: string
  token?: string // Optional, as token may not be present if the transaction is unsuccessful
}
