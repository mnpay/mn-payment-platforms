import { AxiosError } from 'axios'
import { GolomtRequestPath } from '../constants'
import { golomtErrorResponseSchema } from '../schemas'
import { CheckTransactionRequest } from '../types'
import { golomt, isSandBox, mockApi } from './_mocks/api'
import { describe, it, expect } from 'vitest'

// Test suite for makeCheckTransactionRequest
describe('makeCheckTransactionRequest', () => {
  it('should make a POST request to the check transaction endpoint', async () => {
    const { checkTransaction } = golomt
    if (!isSandBox) {
      mockApi?.onPost(GolomtRequestPath.check).reply(200, {
        transactionId: 'test123',
      })
    }

    const params: CheckTransactionRequest = {
      transactionId: 'trans123',
    }

    if (!isSandBox) {
      const response = await checkTransaction(params)
      expect(response.data.transactionId).toBe('test123')
    } else {
      try {
        const response = await checkTransaction(params)
        expect(response.data.transactionId).toBe('test123')
      } catch (error) {
        const errorResponse = golomtErrorResponseSchema.parse((error as AxiosError).response?.data)
        expect(errorResponse.status).toBe(400)
        expect(errorResponse.message).toBe('Payment not found.')
      }
    }
  })
})
