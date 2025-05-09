import { z } from 'zod'
import { merchantRedirectSchema } from '../schemas'

export type MerchantRedirectParams = z.infer<typeof merchantRedirectSchema>
