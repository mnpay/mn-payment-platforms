import { useApi } from '@packages/core'
import { InquiryParams, InquiryResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'

export const makeInquiryRequest = useApi<InquiryParams, InquiryResponse>((api) => {
  return (data) => {
    return api.post(GolomtRequestPath.inquiry, data)
  }
})
