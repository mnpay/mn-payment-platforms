import { DugaarDeereeUrl } from 'mn-dugaar-deeree/constants'
import { useApi } from 'mn-dugaar-deeree/helpers'
import { type CheckTransactionParams, type CheckTransactionResponse } from 'mn-dugaar-deeree/types'

export const createCheckTransaction = useApi<CheckTransactionParams, CheckTransactionResponse>((api) => {
  return async (params) => {
    return await api.get<CheckTransactionResponse>(DugaarDeereeUrl.checkTransaction, {
      params,
    })
  }
})
