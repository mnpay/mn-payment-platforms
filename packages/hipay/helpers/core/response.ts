import { type HipayRequestName } from '@mnpay/hipay/constants'
import { type RequestResponseConfig } from '@mnpay/hipay/definitions'
import { HipayError } from '@mnpay/hipay/errors'
import { type HipayResponse } from '@mnpay/hipay/types'

export const getSuccessResponse = <
  RequestName extends HipayRequestName = HipayRequestName,
  Response extends RequestResponseConfig[RequestName]['response'] = RequestResponseConfig[RequestName]['response'],
>(
  requestName: RequestName,
  response: HipayResponse<Response>,
): Response => {
  if (response.code === 1 || response.code === '1') {
    return response
  }

  if (response.code === '0' || response.code === 0) {
    throw new HipayError(requestName, response)
  }

  throw new HipayError(requestName)
}
