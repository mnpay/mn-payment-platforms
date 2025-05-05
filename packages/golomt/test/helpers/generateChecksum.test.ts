import { describe, it, expect } from 'vitest'
import { generateChecksum } from '@mnpay/golomt/helpers/generateChecksum'
import { InvoiceParams } from '@mnpay/golomt/types'
import { env } from '../_mocks/api'

describe('generateChecksum', () => {
  it('should generate the correct checksum', () => {
    const checksum = env?.VITE_GOLOMT_SECRET
      ? '3e2dd6fd72e640a6a01bac54a58eb0b61975fe3e1b5264f1bfcb1a6d8cc21522'
      : '6b4f750465b22b536e329870d3119983a132922f7bea9ec9097637c4ab3f0eb8'
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
