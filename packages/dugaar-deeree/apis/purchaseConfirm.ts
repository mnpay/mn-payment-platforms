import { DugaarDeereeUrl } from '@mnpay/dugaar-deeree/constants'
import { useApi } from '@mnpay/dugaar-deeree/helpers'
import { type PurchaseConfirmParams, type PurchaseConfirmResponse } from '@mnpay/dugaar-deeree/types'

export const createPurchaseConfirm = useApi<PurchaseConfirmParams, PurchaseConfirmResponse>((api) => {
  return async (data) => {
    return await api.post<PurchaseConfirmResponse>(DugaarDeereeUrl.purchaseConfirm, data)
  }
})
