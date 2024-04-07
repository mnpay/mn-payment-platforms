import { useQpayApi } from '@mnpay/qpay/lib'
import { QpayRequestPath } from '@mnpay/qpay/constants'
import {
  PaymentCancelRequestParams,
  PaymentCancelResponse,
  PaymentCheckRequestParams,
  PaymentCheckResponse,
  PaymentGetRequestParams,
  PaymentGetResponse,
  PaymentListRequestParams,
  PaymentListResponse,
} from '@mnpay/qpay/types'

/**
 * #### Үүсгэсэн нэхэмжлэлийн мэдээллийг харах
 * Query Parameter -д qPay invoice_id -ийг илгээнэ.
 */
export const makeGetPayment = useQpayApi<PaymentGetResponse, PaymentGetRequestParams>((api) => {
  return (params) => {
    return api.get(`${QpayRequestPath.payment}/${params.payment_id}`)
  }
})

export const makeCheckPayment = useQpayApi<PaymentCheckResponse, PaymentCheckRequestParams>((api) => {
  return (params) => {
    const { payment_id, ...data } = params
    return api.post(`${QpayRequestPath.paymentCheck}/${payment_id}`, data)
  }
})

export const makeCancelPayment = useQpayApi<PaymentCancelResponse, PaymentCancelRequestParams>((api) => {
  return (params) => {
    const { payment_id, ...data } = params
    return api.delete(`${QpayRequestPath.paymentCancel}/${payment_id}`, { data })
  }
})

export const makeGetPaymentList = useQpayApi<PaymentListResponse, PaymentListRequestParams>((api) => {
  return (data) => {
    return api.post(QpayRequestPath.paymentList, data)
  }
})
