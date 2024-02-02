import { HipayError, HipayRequestName, type HipayResponseFail, requestConfig } from 'mn-hipay/index'

describe('HipayError', () => {
  it('should create an instance of HipayError', () => {
    const requestName = HipayRequestName.accessToken
    const responseData: HipayResponseFail = {
      code: 0,
      description: 'error',
      details: [],
    }

    const error = new HipayError(requestName, responseData)

    expect(error).toBeInstanceOf(HipayError)
    expect(error.requestName).toBe(requestName)
    expect(error.title).toBe(requestConfig[requestName].errorTitle)
    expect(error.responseData).toEqual(responseData)
    expect(error.message).toBe(`${requestConfig[requestName].errorTitle}: ${JSON.stringify(responseData)}`)
  })

  it('should create an instance of HipayError with a custom message prefix', () => {
    const requestName = HipayRequestName.accessToken
    const responseData: HipayResponseFail = {
      code: 0,
      description: 'error',
      details: [],
    }
    const customMessagePrefix = 'Custom error message:'

    const error = new HipayError(requestName, responseData, customMessagePrefix)

    expect(error).toBeInstanceOf(HipayError)
    expect(error.requestName).toBe(requestName)
    expect(error.title).toBe(requestConfig[requestName].errorTitle)
    expect(error.responseData).toEqual(responseData)
    expect(error.message).toBe(`${customMessagePrefix}: ${JSON.stringify(responseData)}`)
  })
})
