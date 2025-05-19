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
import { parseUrlPath } from '@packages/core/lib/urlPath'

/**
 * #### Үүсгэсэн нэхэмжлэлийн мэдээллийг харах
 * Query Parameter -д qPay invoice_id -ийг илгээнэ.
 */
export const makeGetPayment = useQpayApi<PaymentGetResponse, PaymentGetRequestParams>((api) => {
  return (params) => {
    return api.get(parseUrlPath(QpayRequestPath.payment, params))
  }
})

export const makeCheckPayment = useQpayApi<PaymentCheckResponse, PaymentCheckRequestParams>((api) => {
  return (params) => {
    return api.post(QpayRequestPath.paymentCheck, params)
  }
})

export const makeCancelPayment = useQpayApi<PaymentCancelResponse, PaymentCancelRequestParams>((api) => {
  return (params) => {
    const { payment_id, ...data } = params
    return api.delete(parseUrlPath(QpayRequestPath.paymentCancel, { payment_id }), { data })
  }
})

export const makeRefundPayment = useQpayApi<PaymentCancelResponse, PaymentCancelRequestParams>((api) => {
  return (params) => {
    const { payment_id, ...data } = params
    return api.delete(parseUrlPath(QpayRequestPath.paymentRefund, { payment_id }), { data })
  }
})

export const makeGetPaymentList = useQpayApi<PaymentListResponse, PaymentListRequestParams>((api) => {
  return (data) => {
    return api.post(QpayRequestPath.paymentList, data)
  }
})
