import MockAdapter from 'axios-mock-adapter'
import { useGolomt, golomtDefaultBaseUrl } from '@mnpay/golomt/index'
import { z } from 'zod'

export const golomt = useGolomt({
  endpoint: import.meta.env.VITE_GOLOMT_ENDPOINT ?? golomtDefaultBaseUrl,
  secret: import.meta.env.VITE_GOLOMT_SECRET,
  token: import.meta.env.VITE_GOLOMT_TOKEN,
})

export const isSandBox = import.meta.env.VITE_SANDBOX === 'true'

export const env = isSandBox
  ? z
      .object({
        VITE_SANDBOX: z.literal('true'),
        VITE_GOLOMT_ENDPOINT: z.string(),
        VITE_GOLOMT_SECRET: z.string(),
        VITE_GOLOMT_TOKEN: z.string(),
      })
      .parse(import.meta.env)
  : null

export const mockApi = isSandBox ? null : new MockAdapter(golomt.api)
