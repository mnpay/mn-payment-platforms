import { type HipayStore, type RequestResponseConfig } from 'mn-hipay/definitions'
import { type HipayRequestName } from 'mn-hipay/constants'
import { type AxiosInstance } from 'axios'
import { requestConfig } from 'mn-hipay/configs'
import { getHipayUrlPath } from 'mn-hipay/lib'
import { type HipayResponse } from 'mn-hipay/types'
import { HipayError } from 'mn-hipay/errors'

export const createHipayRequestHandler = <
  RequestName extends HipayRequestName,
  Params extends RequestResponseConfig[RequestName]['params'] = RequestResponseConfig[RequestName]['params'],
  ResponseData extends RequestResponseConfig[RequestName]['response'] = RequestResponseConfig[RequestName]['response'],
>(
  requestName: RequestName,
  api: AxiosInstance,
  store: HipayStore,
  transformer?: (data: Params) => RequestResponseConfig[RequestName]['axiosParams'],
) => {
  const config = requestConfig[requestName]

  return async (params: Params): Promise<ResponseData> => {
    const method = requestConfig[requestName].method.toUpperCase()
    const data = transformer?.(params) ?? params

    const url = getHipayUrlPath(config.url, {
      ...data,
      version: store.config.version,
    })

    const response = await api<HipayResponse<ResponseData>>({
      method,
      url,
      ...(config.dataTransferKey === 'data' ? { data } : {}),
      ...('access_token' in data ? { headers: { Authorization: `Bearer ${data.access_token}` } } : {}),
    })

    const responseData = response.data

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
