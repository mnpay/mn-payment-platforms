import { type TransactionHistory, type DugaarDeereeResponseSuccess } from './core'

export interface CheckStatementParams {
  startDate?: string
  endDate?: string
  offset?: number
  limit?: number
}

export type CheckStatementResponse = DugaarDeereeResponseSuccess<TransactionHistory>
