import MockAdapter from 'axios-mock-adapter'
import { AuthenticateResponse, QpayRequestPath, useQpay } from '@mnpay/qpay/index'
import { z } from 'zod'

export const qpay = useQpay({
  baseUrl: import.meta.env.VITE_BASE_URL ?? 'https://test.qpay.mn',
  username: import.meta.env.VITE_USERNAME ?? 'username',
  password: import.meta.env.VITE_PASSWORD ?? 'password',
})

export const isSandBox = import.meta.env.VITE_SANDBOX === 'true'

export const env = isSandBox
  ? z
      .object({
        VITE_SANDBOX: z.literal('true'),
        VITE_BASE_URL: z.string(),
        VITE_USERNAME: z.string(),
        VITE_PASSWORD: z.string(),
        VITE_INVOICE_CODE: z.string(),
        // VITE_MERCHANT_ID: z.string(),
      })
      .parse(import.meta.env)
  : null

export const mockApi = import.meta.env.VITE_SANDBOX === 'true' ? null : new MockAdapter(qpay.api)

export const mockAuthenticate = () => {
  mockApi?.onPost(QpayRequestPath.authenticate).reply(200, {
    token_type: 'bearer',
    refresh_expires_in: 0,
    refresh_token: 'string',
    access_token: 'string',
    expires_in: 0,
    scope: 'string',
    'not-before-policy': '0',
    session_state: 'string',
  } satisfies AuthenticateResponse)
}
