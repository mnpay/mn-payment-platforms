import { z } from 'zod'

export const merchantRedirectSchema = z.object({
  invoice: z.string(),
  status_code: z.string(),
  desc: z.string(),
})
