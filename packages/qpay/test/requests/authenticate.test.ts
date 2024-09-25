import { QpayRequestPath } from '@mnpay/qpay/constants'
import { env, mockApi, qpay } from '@mnpay/qpay/test/mocks/api'
import { AuthenticateResponse } from '@mnpay/qpay/types'

describe('Authenticate', () => {
  it('should authenticate a user', async () => {
    const params: Parameters<typeof qpay.authenticate>[0] = {
      username: env?.VITE_USERNAME ?? 'username',
      password: env?.VITE_PASSWORD ?? 'password',
    }

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

    const response = await qpay.authenticate(params)

    expect(response.status).toBe(200)
    expectTypeOf(response.data).toEqualTypeOf<AuthenticateResponse>()
  })
})
