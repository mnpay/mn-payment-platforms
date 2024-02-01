import { server } from 'mn-hipay/test/mocks'
import { HttpResponse, http } from 'msw'
import { type HipayDefaultConfig } from 'mn-hipay/definitions'
import { dayjs } from '@packages/core'
import { HipayErrorTitle, createHipay } from 'mn-hipay/index'
import {
  type HipayAccessTokenResponseSuccess,
  type HipayResponseFail,
  type HipayResponse,
  type GetAccessTokenParams,
} from 'mn-hipay/types'

describe('hipay api test', () => {
  const config: HipayDefaultConfig = {
    baseURL: 'https://test.hipay.mn',
    client_id: 'holyMoly',
    client_secret: 'holySecret',
    code: 'holyCode',
    version: 'v2',
  }
  let hipay: ReturnType<typeof createHipay>

  beforeEach(() => {
    hipay = createHipay(config)
  })

  it('can get accessToken & can not get accessToken', async () => {
    const dummyAccessToken = 'hogefuga'
    const dummyExpires = dayjs().add(1, 'hour').unix()

    server.use(
      http.post(`${config.baseURL}/${config.version}/auth/token`, async ({ request }) => {
        const body = (await request.json()) as GetAccessTokenParams

        if (body.client_id === 'holyMoly' && body.client_secret === 'holySecret') {
          return HttpResponse.json<HipayResponse>({
            access_token: dummyAccessToken,
            code: 1,
            expires: dummyExpires,
          } satisfies HipayAccessTokenResponseSuccess)
        }

        return HttpResponse.json<HipayResponse>({
          code: 0,
          description: 'bad hoge',
          details: [{ field: 'hoge', issue: 'bad' }],
        } satisfies HipayResponseFail)
      }),
    )

    const success = await hipay.getAccessToken()
    expect(success.access_token).toBe(dummyAccessToken)
    expect(success.expires).toBe(dummyExpires)

    await expect(
      hipay.getAccessToken({
        client_id: 'devilFruit',
        client_secret: 'devilSecret',
      }),
    ).rejects.toThrowError(
      `${HipayErrorTitle.accessToken}: ${JSON.stringify({
        code: 0,
        description: 'bad hoge',
        details: [{ field: 'hoge', issue: 'bad' }],
      } satisfies HipayResponseFail)}`,
    )
  })
})
