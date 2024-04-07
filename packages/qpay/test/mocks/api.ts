import MockAdapter from 'axios-mock-adapter'
import { useQpay } from '@mnpay/qpay/index'
import { z } from 'zod'

export const qpay = useQpay({
  baseUrl: import.meta.env.VITE_BASE_URL ?? 'https://test.qpay.mn',
})

const isSandBox = import.meta.env.VITE_SANDBOX === 'true'

export const env = isSandBox
  ? z
      .object({
        VITE_SANDBOX: z.literal('true'),
        VITE_BASE_URL: z.string(),
        VITE_USERNAME: z.string(),
        VITE_PASSWORD: z.string(),
        VITE_INVOICE_CODE: z.string(),
        VITE_MERCHANT_ID: z.string(),
      })
      .parse(import.meta.env)
  : null

export const mockApi = import.meta.env.VITE_SANDBOX === 'true' ? null : new MockAdapter(qpay.api)
