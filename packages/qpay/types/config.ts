import { type QpayApiVersion } from '@/constants'

export interface QpayConfig {
  baseUrl?: string
  version?: QpayApiVersion
  accessToken?: string
  refreshToken?: string
  expiresIn?: Date
}
