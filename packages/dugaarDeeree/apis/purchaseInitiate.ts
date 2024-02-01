import { DugaarDeereeUrl } from 'mn-dugaar-deeree/constants'
import { useApi } from 'mn-dugaar-deeree/helpers'
import { type PurchaseInititateParams, type PurchaseInitiateResponse } from 'mn-dugaar-deeree/types'

export const createPurchaseInitiate = useApi<PurchaseInititateParams, PurchaseInitiateResponse>((api) => {
  return async (data) => {
    return await api.post<PurchaseInitiateResponse>(DugaarDeereeUrl.purchaseInitiate, data)
  }
})
