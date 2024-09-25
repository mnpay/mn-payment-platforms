import { PaymentGetRequestParams } from './paymentGet'

// TODO: Sura - reconfirm the response
export interface PaymentCancelRequestParams extends PaymentGetRequestParams {
  /**
   * Төлөгдсөн төлбөрийн ID-г Callback URL-аар авсаны дараа тухайн хэсэгт оруулж өгнө.
   * @example https://qpay.mn/payment/result?payment_id=a2ab7ab0-80b0-4045-b79a-3052eda1ca89
   */
  callaback_url: string
  /**
   * Тэмдэглэл
   * @example 'butsaalt'
   */
  note: string
}

// TODO: Sura - reconfirm the response
export interface PaymentCancelResponse {
  error: 'PAYMENT_SETTLED'
  message: 'PAYMENT_SETTLED'
}
