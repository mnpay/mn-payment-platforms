import { DugaarDeereeUrl } from 'mn-dugaar-deeree/constants'
import { useApi } from 'mn-dugaar-deeree/helpers'
import { type GetAccessTokenParams, type GetAccessTokenResponse } from 'mn-dugaar-deeree/types'

export const createGetAccessToken = useApi<GetAccessTokenParams, GetAccessTokenResponse>((api) => {
  return async (data) => {
    const response = await api.post<GetAccessTokenResponse>(DugaarDeereeUrl.authenticate, data)

    api.defaults.headers.Authorization = `Bearer ${response.data.result}`

    return response
  }
})
