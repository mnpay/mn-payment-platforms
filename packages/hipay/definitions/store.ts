import { type TokenStore } from 'mn-hipay/types'
import { type HipayConfig } from './core'

export interface HipayStore {
  token?: TokenStore | undefined
  config: HipayConfig
}
