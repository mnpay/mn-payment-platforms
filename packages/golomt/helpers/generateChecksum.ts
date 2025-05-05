import { hmac256 } from '../lib'
import { InvoiceParams } from '../types'

export const generateChecksum = (params: InvoiceParams, secret: string) => {
  const rawChecksum = params.checksum ?? `${params.transactionId}${params.amount}${params.returnType}${params.callback}`

  return hmac256(secret, rawChecksum)
}
