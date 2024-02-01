import { type GetAccessTokenParamsApi } from 'mn-hipay/types'

export type HipayConfig = Omit<GetAccessTokenParamsApi, 'redirect_uri' | 'grant_type'> & {
  baseURL: string
  version: 'v2'
}
