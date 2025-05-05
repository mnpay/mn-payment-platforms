import { z } from 'zod'
import { GolomtRequestPath } from '../constants'

export const errorResponseSchema = z.object({
  timestamp: z.string(),
  status: z.literal(200).or(z.literal(400)).or(z.literal(403)).or(z.literal(500)),
  error: z.enum(['Validation', 'NotFound', 'Internal', 'Forbidden']),
  message: z.string(),
  path: z.nativeEnum(GolomtRequestPath),
})
