import { type DugaarDeereeResponse } from './core'
import { type IntCode } from 'mn-dugaar-deeree/constants'

export interface CheckCustomerParams {
  isdn: string
}

export type CheckCustomerResponse = DugaarDeereeResponse<IntCode.success>
