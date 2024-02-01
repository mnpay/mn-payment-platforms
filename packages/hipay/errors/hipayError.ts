import { requestConfig } from 'mn-hipay/configs'
import { type HipayErrorTitle, type HipayRequestName } from 'mn-hipay/constants'
import { type HipayResponseFail } from 'mn-hipay/types'

export class HipayError extends Error {
  public readonly responseData?: HipayResponseFail
  public readonly requestName: HipayRequestName
  public readonly title: HipayErrorTitle

  constructor(requestName: HipayRequestName, responseData?: HipayResponseFail, customMessagePrefix?: string) {
    const config = requestConfig[requestName]
    const message = `${customMessagePrefix ?? config.errorTitle}: ${JSON.stringify(responseData)}`
    super(message)
    this.requestName = requestName
    this.title = config.errorTitle
    this.responseData = responseData
  }
}
