import { useApi } from '@packages/core'
import { TokenCreationRequest, TokenCreationResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'

export const makeTokenCreationRequest = useApi<TokenCreationRequest, TokenCreationResponse>((api) => {
  return (data) => {
    return api.post(GolomtRequestPath.confirmation, data)
  }
})
