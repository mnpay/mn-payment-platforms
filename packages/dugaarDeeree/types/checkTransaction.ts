import { type Transaction, type DugaarDeereeResponseSuccess } from './core'

export interface CheckTransactionParams {
  invoiceId: string
}

export type CheckTransactionResponse = DugaarDeereeResponseSuccess<Transaction>
