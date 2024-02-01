import { type TokenStore, type HipayEntityId, type HipayResponseSuccess } from './core'

export interface GetAccessTokenParams {
  code?: string
  client_secret?: string
  redirect_uri?: string
  client_id?: HipayEntityId
  grant_type?: 'authorization_code'
}

export interface GetAccessTokenParamsApi extends GetAccessTokenParams {
  code: string
  client_secret: string
  redirect_uri: string
  client_id: HipayEntityId
  grant_type: 'authorization_code'
}

export interface HipayAccessTokenResponseSuccess extends HipayResponseSuccess, TokenStore {}
