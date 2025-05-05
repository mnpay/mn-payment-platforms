import { useApi } from '@packages/core'
import { TokenConfirmationRequest, TokenConfirmationResponse } from '@mnpay/golomt/types'
import { GolomtRequestPath } from '@mnpay/golomt/constants'

export const makeTokenConfirmationRequest = useApi<TokenConfirmationRequest, TokenConfirmationResponse>((api) => {
  return (data) => {
    return api.post(GolomtRequestPath.getToken, data)
  }
})
