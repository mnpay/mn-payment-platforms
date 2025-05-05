import { describe, it, expect } from 'vitest'
import { generateChecksum } from '@mnpay/golomt/helpers/generateChecksum'
import { InvoiceParams } from '@mnpay/golomt/types'
import { env } from '../mocks/api'

describe('generateChecksum', () => {
  it('should generate the correct checksum', () => {
    const checksum = '3e2dd6fd72e640a6a01bac54a58eb0b61975fe3e1b5264f1bfcb1a6d8cc21522'
    const params: InvoiceParams = {
      amount: 2000,
      callback: 'https://uwish.travel',
      genToken: 'N',
      transactionId: 'helloworld1',
      returnType: 'GET',
      socialDeeplink: 'N',
    }

    const secret = env?.VITE_GOLOMT_SECRET ?? 'testSecret'
    const result = generateChecksum(params, secret)

    expect(result).toBe(checksum)
  })
})
