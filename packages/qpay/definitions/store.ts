import { type QpayConfig } from '@mnpay/qpay/types'

export type Store = QpayConfig

export interface StoreConfig {
  store: Readonly<Store>
  setStore: (store: Partial<Store>) => void
}
