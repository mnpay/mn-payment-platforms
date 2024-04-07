export const qpayDefaultBaseUrl = 'https://api.qpay.mn'

export enum QpayApiVersion {
  v2 = 'v2',
  v1 = 'v1',
}

export enum QpayRequestPath {
  authenticate = '/auth/token',
  refresh = '/auth/refresh',
  invoice = '/invoice',
  payment = '/payment',
  paymentCheck = '/payment/check',
  paymentCancel = '/payment/refund',
  paymentList = '/payment/list',
  create = '/bill/create',
  createWithTransaction = '/bill/create_with_transaction',
  check = '/bill/check',
  getCheck = '/payment/check/:id',
}
