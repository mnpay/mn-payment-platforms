import { useApi } from '@mnpay/dugaar-deeree/helpers'
import { DugaarDeereeUrl } from '@mnpay/dugaar-deeree/constants'
import { type CheckStatementResponse, type CheckStatementParams } from '@mnpay/dugaar-deeree/types'

export const createCheckStatement = useApi<CheckStatementParams, CheckStatementResponse>((api) => {
  return async (params) => {
    return await api.get<CheckStatementResponse>(DugaarDeereeUrl.checkStatement, {
      params,
    })
  }
})
