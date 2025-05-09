import { useApi } from '@packages/core'
import { GolomtConfig, InvoiceParams, InvoiceResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'
import { generateInvoiceChecksum } from '../helpers'

export const makeCreateInvoiceRequest = useApi<InvoiceParams, InvoiceResponse, GolomtConfig>((api, store) => {
  return async (data) => {
    const checksum = await generateInvoiceChecksum(data, store.secret)
    const params = { ...data, checksum }

    return api.post(GolomtRequestPath.invoice, params)
  }
})
