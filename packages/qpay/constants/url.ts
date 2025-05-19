export const qpayDefaultBaseUrl = 'https://api.qpay.mn'

export enum QpayApiVersion {
  v2 = 'v2',
  v1 = 'v1',
}

export enum QpayRequestPath {
  authenticate = '/auth/token',
  refresh = '/auth/refresh',
  invoice = '/invoice',
  payment = '/payment/:payment_id',
  paymentCheck = '/payment/check',
  paymentCancel = '/payment/cancel/:payment_id',
  paymentRefund = '/payment/refund/:payment_id',
  paymentList = '/payment/list',
  create = '/bill/create',
  createWithTransaction = '/bill/create_with_transaction',
  check = '/bill/check',
  getInvoice = '/invoice/:invoice_id',
}
