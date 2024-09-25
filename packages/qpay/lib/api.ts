import { useApi } from '@packages/core'
import { type StoreConfig } from '@mnpay/qpay/definitions'

export const useQpayApi = <Res, Req = undefined>(...params: Parameters<typeof useApi<Req, Res, StoreConfig>>) => {
  return useApi<Req, Res, StoreConfig>(...params)
}
