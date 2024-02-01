import { useApi } from 'mn-dugaar-deeree/helpers'
import { DugaarDeereeUrl } from 'mn-dugaar-deeree/constants'
import { type CheckStatementResponse, type CheckStatementParams } from 'mn-dugaar-deeree/types'

export const createCheckStatement = useApi<CheckStatementParams, CheckStatementResponse>((api) => {
  return async (params) => {
    return await api.get<CheckStatementResponse>(DugaarDeereeUrl.checkStatement, {
      params,
    })
  }
})
