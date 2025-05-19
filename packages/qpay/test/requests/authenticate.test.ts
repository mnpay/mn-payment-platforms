import { env, mockAuthenticate, qpay } from '@mnpay/qpay/test/mocks/api'
import { AuthenticateResponse } from '@mnpay/qpay/types'

describe('Authenticate', () => {
  it('should authenticate a user', async () => {
    const params: Parameters<typeof qpay.authenticate>[0] = {
      username: env?.VITE_USERNAME ?? 'username',
      password: env?.VITE_PASSWORD ?? 'password',
    }

    mockAuthenticate()

    const response = await qpay.authenticate(params)

    expect(response.status).toBe(200)
    expectTypeOf(response.data).toEqualTypeOf<AuthenticateResponse>()
  })
})
