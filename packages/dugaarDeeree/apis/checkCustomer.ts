import { DugaarDeereeUrl } from '@mnpay/dugaar-deeree/constants'
import { useApi } from '@mnpay/dugaar-deeree/helpers'
import { type CheckCustomerResponse } from '@mnpay/dugaar-deeree/types'

export const createCheckCustomer = useApi<{ isdn: string }, CheckCustomerResponse>((api) => {
  return async (params) => {
    return await api.get<CheckCustomerResponse>(DugaarDeereeUrl.checkCustomer, {
      params,
    })
  }
})
