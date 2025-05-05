import { useApi } from '@packages/core'
import { CheckTransactionRequest, CheckTransactionResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'

export const makeCheckTransactionRequest = useApi<CheckTransactionRequest, CheckTransactionResponse>((api) => {
  return (data) => {
    return api.post(GolomtRequestPath.checkTransaction, data)
  }
})
