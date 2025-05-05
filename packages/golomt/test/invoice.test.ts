// Extend the mock API to include all necessary properties

import { InvoiceParams } from '../types'
import { golomt } from './mocks/api'
import { describe, it, expect } from 'vitest'

// Test suite for makeCreateInvoiceRequest
describe('makeCreateInvoiceRequest', () => {
  it('should make a POST request to the invoice endpoint', async () => {
    const { createInvoice } = golomt

    const params: InvoiceParams = {
      amount: 1000,
      callback: 'https://testapi.uwish.travel/webhook/en/golomt',
      genToken: 'N',
      transactionId: 'trans123',
      returnType: 'GET',
      socialDeeplink: 'N',
    }

    const response = await createInvoice(params)

    expect(response.data.transactionId).toBe('test123')
    expect(response.data.invoice).toBe('invoice123')
  })
})
