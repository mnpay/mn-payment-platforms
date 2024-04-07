export interface RefreshRequestParams {
  refreshToken?: string
}

export interface RefreshRequestHeader {
  Authorization: string
}

export interface RefreshResponse {
  token_type: 'bearer'
  refresh_expires_in: number
  refresh_token: string
  access_token: string
  expires_in: number
  scope: string
  'not-before-policy': '0' | '1'
  session_state: string
}
