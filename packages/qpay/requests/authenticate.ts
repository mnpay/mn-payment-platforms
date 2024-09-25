import { type AuthenticateResponse, type AuthenticateParams } from '@mnpay/qpay/types'
import { QpayRequestPath } from '@mnpay/qpay/constants'
import { useQpayApi } from '@mnpay/qpay/lib'

export const makeCreateAuthenticate = useQpayApi<AuthenticateResponse, AuthenticateParams>(
  (api, { setStore }) =>
    async (data) => {
      const token = Buffer.from(`${data.username}:${data.password}`).toString('base64')

      const response = await api.post<AuthenticateResponse>(QpayRequestPath.authenticate, undefined, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })

      setStore({
        accessToken: response.data.access_token,
        expiresIn: new Date(response.data.expires_in * 1000),
      })

      return response
    },
)
