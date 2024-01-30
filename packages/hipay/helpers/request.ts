import { type RequestResponseConfig } from '@packages/hipay/definitions'
import { type HipayRequestName } from '@packages/hipay/constants'
import { type AxiosInstance } from 'axios'
import { requestConfig } from '@packages/hipay/configs'
import { getHipayUrlPath } from '@packages/hipay/lib'
import { type HipayResponse } from '@packages/hipay/types'
import { HipayError } from '@packages/hipay/errors'

export const createHipayRequestHandler = <
  RequestName extends HipayRequestName,
  Params extends RequestResponseConfig[RequestName]['params'] = RequestResponseConfig[RequestName]['params'],
  ResponseData extends RequestResponseConfig[RequestName]['response'] = RequestResponseConfig[RequestName]['response'],
>(
  requestName: RequestName,
  api: AxiosInstance,
  transformer?: (data: Params) => RequestResponseConfig[RequestName]['axiosParams'],
) => {
  const config = requestConfig[requestName]

  return async (params: Params): Promise<ResponseData> => {
    const data = transformer?.(params) ?? params

    const url = getHipayUrlPath(config.url, {
      ...data,
      version: api.defaults.version,
    })

    const responseData = (
      await api<HipayResponse<ResponseData>>({
        method: requestConfig[requestName].method.toUpperCase(),
        url,
        ...(config.dataTransferKey === 'data' ? { data } : {}),
        ...('access_token' in data ? { headers: { Authorization: `Bearer ${data.access_token}` } } : {}),
      })
    ).data

    if (responseData.code === 1 || responseData.code === '1') {
      return responseData
    }

    if (responseData.code === '0' || responseData.code === 0) {
      throw new HipayError(requestName, responseData)
    }

    throw new HipayError(requestName, {
      code: 0,
      description: 'unexpected error',
      details: [],
    })
  }
}
