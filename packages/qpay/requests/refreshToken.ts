import { QpayRequestPath } from '@mnpay/qpay/constants'
import { useQpayApi } from '@mnpay/qpay/lib'
import { RefreshRequestParams, RefreshResponse } from '@mnpay/qpay/types'
import { z } from 'zod'

/**
 * Токен шинэчилэх хүсэлт
 * Access token шинэчлэн авах API.
 * refresh_token -ийг ашиглана.
 */
export const makeRefreshToken = useQpayApi<RefreshResponse, RefreshRequestParams>((api, { store, setStore }) => {
  return async (data) => {
    const refreshToken = z.string().parse(data.refreshToken ?? store.refreshToken)

    const response = await api.post(QpayRequestPath.refresh, undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })

    setStore({
      accessToken: response.data.access_token,
      expiresIn: new Date(response.data.expires_in * 1000),
      refreshToken: response.data.refresh_token,
    })

    return response
  }
})
