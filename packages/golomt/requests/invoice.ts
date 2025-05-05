import { useApi } from '@packages/core'
import { GolomtConfig, InvoiceParams, InvoiceResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'
import { generateChecksum } from '../helpers'

export const makeCreateInvoiceRequest = useApi<InvoiceParams, InvoiceResponse, GolomtConfig>((api, store) => {
  return (data) => {
    const checksum = data.checksum ?? generateChecksum(data, store.secret)
    const params = { ...data, checksum }

    return api.post(GolomtRequestPath.invoice, params)
  }
})
