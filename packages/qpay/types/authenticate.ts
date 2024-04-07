export interface AuthenticateParams {
  username: string
  password: string
}

export interface AutheticateParamsHeader {
  Authorization: string
}

export interface AuthenticateResponse {
  token_type: 'bearer'
  refresh_expires_in: number
  refresh_token: string
  access_token: string
  expires_in: number
  scope: string
  'not-before-policy': '0' | '1'
  session_state: string
}
