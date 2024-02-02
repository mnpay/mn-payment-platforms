import { DugaarDeereeUrl } from '@mnpay/dugaar-deeree/constants'
import { useApi } from '@mnpay/dugaar-deeree/helpers'
import { type PurchaseInititateParams, type PurchaseInitiateResponse } from '@mnpay/dugaar-deeree/types'

export const createPurchaseInitiate = useApi<PurchaseInititateParams, PurchaseInitiateResponse>((api) => {
  return async (data) => {
    return await api.post<PurchaseInitiateResponse>(DugaarDeereeUrl.purchaseInitiate, data)
  }
})
