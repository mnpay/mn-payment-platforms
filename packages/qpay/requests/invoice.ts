import { QpayRequestPath } from '@mnpay/qpay/constants'
import { useQpayApi } from '@mnpay/qpay/lib'
import { GetOrCancelInvoiceRequestParams, CreateInvoiceRequestParams, InvoiceResponse } from '@mnpay/qpay/types'

/**
 * #### Төлбөрийн нэхэмжлэл үүсгэх.
 * `invoice_code` -ийг qPay -ээс олгоно.
 */
export const makeCreateInvoice = useQpayApi<InvoiceResponse, CreateInvoiceRequestParams>((api) => {
  return (data) => {
    return api.post(QpayRequestPath.invoice, data)
  }
})

/**
 * #### Үүсгэсэн нэхэмжлэлийн мэдээллийг харах
 * Query Parameter -д qPay invoice_id -ийг илгээнэ.
 */
export const makeGetInvoice = useQpayApi<InvoiceResponse, GetOrCancelInvoiceRequestParams>((api) => {
  return (params) => {
    return api.get(`${QpayRequestPath.getCheck}/${params.invoice_id}`)
  }
})

/**
 * #### Төлбөрийн нэхэмжлэл цуцлах
 * Query Parameter -д qPay invoice_id -ийг илгээнэ.
 */
export const makeCancelInvoice = useQpayApi<InvoiceResponse, GetOrCancelInvoiceRequestParams>((api) => {
  return (params) => {
    return api.delete(`${QpayRequestPath.getCheck}/${params.invoice_id}`)
  }
})
