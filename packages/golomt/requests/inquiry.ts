import { useApi } from '@packages/core'
import { GolomtConfig, InquiryParams, InquiryResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'
import { generateTransactionCheckChecksum } from '../helpers'

export const makeInquiryRequest = useApi<InquiryParams, InquiryResponse, GolomtConfig>((api, store) => {
  return async (data) => {
    const checksum = await generateTransactionCheckChecksum(data, store.secret)
    const params = { ...data, checksum }

    return api.post(GolomtRequestPath.inquiry, params)
  }
})
