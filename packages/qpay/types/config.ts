import { type QpayApiVersion } from '@mnpay/qpay/constants'

export interface QpayConfig {
  baseUrl?: string
  version?: QpayApiVersion
  accessToken?: string
  refreshToken?: string
  expiresIn?: Date
}
