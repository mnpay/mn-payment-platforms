import { DugaarDeereeUrl } from '@packages/dugaar-deeree/constants'
import { useApi } from '@packages/dugaar-deeree/helpers'
import { type CheckTransactionParams, type CheckTransactionResponse } from '@packages/dugaar-deeree/types'

export const createCheckTransaction = useApi<CheckTransactionParams, CheckTransactionResponse>((api) => {
  return async (params) => {
    return await api.get<CheckTransactionResponse>(DugaarDeereeUrl.checkTransaction, {
      params,
    })
  }
})
