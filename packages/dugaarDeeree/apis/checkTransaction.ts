import { DugaarDeereeUrl } from '@mnpay/dugaar-deeree/constants'
import { useApi } from '@mnpay/dugaar-deeree/helpers'
import { type CheckTransactionParams, type CheckTransactionResponse } from '@mnpay/dugaar-deeree/types'

export const createCheckTransaction = useApi<CheckTransactionParams, CheckTransactionResponse>((api) => {
  return async (params) => {
    return await api.get<CheckTransactionResponse>(DugaarDeereeUrl.checkTransaction, {
      params,
    })
  }
})
