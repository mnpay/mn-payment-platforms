import { type DugaarDeereeResponseSuccess } from './core'

export interface GetAccessTokenParams {
  clientId: string
  clientSecret: string
}

/** result returns accessToken `string` */
export type GetAccessTokenResponse = DugaarDeereeResponseSuccess<string>
