export type QpayApiVersionType = `v${number}`

export interface QpayConfig {
  baseUrl?: string
  version?: QpayApiVersionType
  accessToken?: string
  refreshToken?: string
  expiresIn?: Date
}
