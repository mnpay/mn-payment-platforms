import { DugaarDeereeUrl } from '@packages/dugaar-deeree/constants'
import { useApi } from '@packages/dugaar-deeree/helpers'
import { type PurchaseConfirmParams, type PurchaseConfirmResponse } from '@packages/dugaar-deeree/types'

export const createPurchaseConfirm = useApi<PurchaseConfirmParams, PurchaseConfirmResponse>((api) => {
  return async (data) => {
    return await api.post<PurchaseConfirmResponse>(DugaarDeereeUrl.purchaseConfirm, data)
  }
})
