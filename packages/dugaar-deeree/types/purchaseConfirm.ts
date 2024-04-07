import { type DugaarDeereeResponseSuccess } from './core'

export interface PurchaseConfirmParams {
  invoiceNo: string
  tan: string
}

export type PurchaseConfirmResponse = DugaarDeereeResponseSuccess<string>
