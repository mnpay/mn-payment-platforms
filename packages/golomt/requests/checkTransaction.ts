import { useApi } from '@packages/core'
import { CheckTransactionRequest, CheckTransactionResponse, GolomtConfig } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'
import { generateTransactionCheckChecksum } from '../helpers'

export const makeCheckTransactionRequest = useApi<CheckTransactionRequest, CheckTransactionResponse, GolomtConfig>(
  (api, store) => {
    return async (data) => {
      const checksum = await generateTransactionCheckChecksum(data, store.secret)
      const params = { ...data, checksum }

      return api.post(GolomtRequestPath.checkTransaction, params)
    }
  },
)
