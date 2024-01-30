import { DugaarDeereeUrl } from '@packages/dugaar-deeree/constants'
import { useApi } from '@packages/dugaar-deeree/helpers'
import { type CheckCustomerResponse } from '@packages/dugaar-deeree/types'

export const createCheckCustomer = useApi<{ isdn: string }, CheckCustomerResponse>((api) => {
  return async (params) => {
    return await api.get<CheckCustomerResponse>(DugaarDeereeUrl.checkCustomer, {
      params,
    })
  }
})
