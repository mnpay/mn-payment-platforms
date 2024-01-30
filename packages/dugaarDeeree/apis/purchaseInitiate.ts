import { DugaarDeereeUrl } from '@packages/dugaar-deeree/constants'
import { useApi } from '@packages/dugaar-deeree/helpers'
import { type PurchaseInititateParams, type PurchaseInitiateResponse } from '@packages/dugaar-deeree/types'

export const createPurchaseInitiate = useApi<PurchaseInititateParams, PurchaseInitiateResponse>((api) => {
  return async (data) => {
    return await api.post<PurchaseInitiateResponse>(DugaarDeereeUrl.purchaseInitiate, data)
  }
})
