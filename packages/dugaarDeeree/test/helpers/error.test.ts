import {
  DugaarDeereeUrl,
  type GetAccessTokenResponse,
  apiBaseURL,
  codeToErrorMessage,
  getDugaarDeereeErrorResponse,
  IntCode,
  type DugaarDeereeResponseError,
  Code,
  useDugaarDeeree,
} from 'mn-dugaar-deeree'
import { HttpResponse, http } from 'msw'
import { server } from 'mn-dugaar-deeree/test/mocks'

test('should return correct error response', async () => {
  server.use(
    http.post(`${apiBaseURL}${DugaarDeereeUrl.authenticate}`, () => {
      return HttpResponse.json<GetAccessTokenResponse>({
        result: '',
        intCode: IntCode.success,
      })
    }),
    http.get(`${apiBaseURL}${DugaarDeereeUrl.checkCustomer}`, () => {
      return new HttpResponse(
        JSON.stringify({
          intCode: IntCode.badRequest,
          code: Code.badRequest,
          info: codeToErrorMessage[Code.badRequest],
        } satisfies DugaarDeereeResponseError),
        { status: 400 },
      )
    }),
  )

  const dugaarDeere = useDugaarDeeree({ clientId: '', clientSecret: '' })
  try {
    await dugaarDeere.checkCustomer({ isdn: '123456789' })
    expect(true).toBe(false)
  } catch (error) {
    const err = getDugaarDeereeErrorResponse(error)

    expect(err).toStrictEqual({
      status: 400,
      data: {
        code: Code.badRequest,
        intCode: IntCode.badRequest,
        message: codeToErrorMessage[Code.badRequest],
      },
    })
  }
})

test('should return default error response for unknown error', async () => {
  server.use(
    http.post(`${apiBaseURL}${DugaarDeereeUrl.authenticate}`, () => {
      return HttpResponse.json<GetAccessTokenResponse>({
        result: '',
        intCode: IntCode.success,
      })
    }),
    http.get(`${apiBaseURL}${DugaarDeereeUrl.checkCustomer}`, () => {
      return new HttpResponse(
        JSON.stringify({
          intCode: IntCode.badRequest,
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment, @typescript-eslint/prefer-ts-expect-error
          // @ts-ignore
          code: 'unexpected system error',
          info: codeToErrorMessage[Code.badRequest],
        } satisfies DugaarDeereeResponseError),
        { status: 500 },
      )
    }),
  )

  const dugaarDeere = useDugaarDeeree({ clientId: '', clientSecret: '' })
  try {
    await dugaarDeere.checkCustomer({ isdn: '123456789' })
    expect(true).toBe(false)
  } catch (error) {
    const err = getDugaarDeereeErrorResponse(error)

    expect(err).toStrictEqual({
      status: 500,
      data: {
        code: Code.unknown,
        intCode: IntCode.badRequest,
        message: codeToErrorMessage[Code.unknown],
      },
    })
  }
})
