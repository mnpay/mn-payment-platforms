import { requestConfig } from '@mnpay/hipay/configs'
import { type HipayRequestName } from '@mnpay/hipay/constants'
import { type HipayStore, type RequestResponseConfig } from '@mnpay/hipay/definitions'
import { HipayError } from '@mnpay/hipay/errors'
import { getSuccessResponse } from '@mnpay/hipay/helpers/core'
import { getHipayUrlPath } from '@mnpay/hipay/lib'
import { type HipayResponse } from '@mnpay/hipay/types'
import { type AxiosInstance } from 'axios'

export const createHipayRequestHandler = <
  RequestName extends HipayRequestName,
  Params extends RequestResponseConfig[RequestName]['params'],
  ResponseData extends RequestResponseConfig[RequestName]['response'],
>(
  requestName: RequestName,
  api: AxiosInstance,
  store: HipayStore,
  transformer?: (data: Params) => RequestResponseConfig[RequestName]['axiosParams'],
) => {
  const config = requestConfig[requestName]
  const method = requestConfig[requestName].method.toUpperCase()
  const version = store.config.version

  return async (params: Params): Promise<ResponseData> => {
    const data = transformer?.(params) ?? params
    const url = getHipayUrlPath(config.url, { ...data, version })

    const getResponse = async () => {
      try {
        return await api<HipayResponse<ResponseData>>({
          method,
          url,
          ...(config.dataTransferKey === 'data' ? { data } : {}),
          ...('access_token' in data ? { headers: { Authorization: `Bearer ${data.access_token}` } } : {}),
        })
      } catch {
        throw new HipayError(requestName)
      }
    }

    return getSuccessResponse(requestName, (await getResponse()).data)
  }
}
