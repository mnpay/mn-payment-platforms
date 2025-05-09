import { useApi } from '@packages/core'
import { GolomtConfig, PayTransactionRequest, PayTransactionResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'
import { generatePayTransactionChecksum } from '../helpers'

export const makePayTransactionRequest = useApi<PayTransactionRequest, PayTransactionResponse, GolomtConfig>(
  (api, store) => {
    return async (data) => {
      const checksum = await generatePayTransactionChecksum(data, store.secret)
      const params = { ...data, checksum }

      return api.post(GolomtRequestPath.payTransaction, params)
    }
  },
)
