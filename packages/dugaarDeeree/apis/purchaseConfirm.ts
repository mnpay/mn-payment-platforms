import { DugaarDeereeUrl } from 'mn-dugaar-deeree/constants'
import { useApi } from 'mn-dugaar-deeree/helpers'
import { type PurchaseConfirmParams, type PurchaseConfirmResponse } from 'mn-dugaar-deeree/types'

export const createPurchaseConfirm = useApi<PurchaseConfirmParams, PurchaseConfirmResponse>((api) => {
  return async (data) => {
    return await api.post<PurchaseConfirmResponse>(DugaarDeereeUrl.purchaseConfirm, data)
  }
})
