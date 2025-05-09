import { hmac256 } from '../lib'
import { InvoiceParams, PayTransactionRequest } from '../types'

export const generateInvoiceChecksum = async (params: InvoiceParams, secret: string) => {
  if (params.checksum) {
    return params.checksum
  }

  return await hmac256(secret, `${params.transactionId}${params.amount}${params.returnType}${params.callback}`)
}

export const generateTransactionCheckChecksum = async (
  params: { transactionId: string; checksum?: string },
  secret: string,
) => {
  if (params.checksum) {
    return params.checksum
  }

  return await hmac256(secret, `${params.transactionId}${params.transactionId}`)
}

export const generatePayTransactionChecksum = async (params: PayTransactionRequest, secret: string) => {
  if (params.checksum) {
    return params.checksum
  }

  return await hmac256(secret, `${params.amount}${params.transactionId}${params.token}`)
}
