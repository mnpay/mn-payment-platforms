import { useApi } from '@packages/dugaar-deeree/helpers'
import { DugaarDeereeUrl } from '@packages/dugaar-deeree/constants'
import { type CheckStatementResponse, type CheckStatementParams } from '@packages/dugaar-deeree/types'

export const createCheckStatement = useApi<CheckStatementParams, CheckStatementResponse>((api) => {
  return async (params) => {
    return await api.get<CheckStatementResponse>(DugaarDeereeUrl.checkStatement, {
      params,
    })
  }
})
