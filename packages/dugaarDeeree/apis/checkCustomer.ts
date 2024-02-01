import { DugaarDeereeUrl } from 'mn-dugaar-deeree/constants'
import { useApi } from 'mn-dugaar-deeree/helpers'
import { type CheckCustomerResponse } from 'mn-dugaar-deeree/types'

export const createCheckCustomer = useApi<{ isdn: string }, CheckCustomerResponse>((api) => {
  return async (params) => {
    return await api.get<CheckCustomerResponse>(DugaarDeereeUrl.checkCustomer, {
      params,
    })
  }
})
