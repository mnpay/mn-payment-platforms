import { type DugaarDeereeResponseSuccess } from './core'

export interface PurchaseInititateParams {
  buyer: string
  amount: number
  description: string
}

export type PurchaseInitiateResponse = DugaarDeereeResponseSuccess<string>
