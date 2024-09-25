import { type QpayConfig } from '@mnpay/qpay/types'

export interface Store extends QpayConfig {}

export interface StoreConfig {
  store: Readonly<Store>
  setStore: (store: Partial<Store>) => void
}
