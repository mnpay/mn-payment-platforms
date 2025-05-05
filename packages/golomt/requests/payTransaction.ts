import { useApi } from '@packages/core'
import { PayTransactionRequest, PayTransactionResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'

export const makePayTransactionRequest = useApi<PayTransactionRequest, PayTransactionResponse>((api) => {
  return (data) => {
    return api.post(GolomtRequestPath.payTransaction, data)
  }
})
