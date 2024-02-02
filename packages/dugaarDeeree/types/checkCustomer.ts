import { type DugaarDeereeResponse } from './core'
import { type IntCode } from '@mnpay/dugaar-deeree/constants'

export interface CheckCustomerParams {
  isdn: string
}

export type CheckCustomerResponse = DugaarDeereeResponse<IntCode.success>
