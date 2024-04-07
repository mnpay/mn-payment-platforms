import { QpayRequestPath } from '@mnpay/qpay/constants'
import { useQpayApi } from '@mnpay/qpay/lib'
import { RefreshRequestParams, RefreshResponse } from '@mnpay/qpay/types'
import { z } from 'zod'

/**
 * Токен шинэчилэх хүсэлт
 * Access token шинэчлэн авах API.
 * refresh_token -ийг ашиглана.
 */
export const makeRefreshToken = useQpayApi<RefreshResponse, RefreshRequestParams>((api, { store }) => {
  return (data) => {
    const refreshToken = z.string().parse(data.refreshToken ?? store.refreshToken)

    return api.post(QpayRequestPath.refresh, undefined, {
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
    })
  }
})
