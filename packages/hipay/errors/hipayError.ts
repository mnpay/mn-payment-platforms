import { requestConfig } from '@mnpay/hipay/configs'
import { type HipayErrorTitle, type HipayRequestName } from '@mnpay/hipay/constants'
import { type HipayResponseFail } from '@mnpay/hipay/types'

export class HipayError<RequestName extends HipayRequestName = HipayRequestName> extends Error {
  public readonly requestName: RequestName
  public readonly responseData?: HipayResponseFail
  public readonly title: HipayErrorTitle

  constructor(
    requestName: RequestName,
    responseData: HipayResponseFail = {
      code: 0,
      description: 'unexpected error',
      details: [],
    },
    customMessagePrefix?: string,
  ) {
    const config = requestConfig[requestName]
    const message = `${customMessagePrefix ?? config.errorTitle}: ${JSON.stringify(responseData)}`
    super(message)
    this.requestName = requestName
    this.title = config.errorTitle
    this.responseData = responseData
  }
}
