import { server } from 'mn-hipay/test/mocks'
import { HttpResponse, http } from 'msw'
import { type HipayConfig } from 'mn-hipay/definitions'
import { dayjs } from '@packages/core'
import { HipayError, HipayErrorTitle, createHipay } from 'mn-hipay/index'
import {
  type HipayAccessTokenResponseSuccess,
  type HipayResponseFail,
  type HipayResponse,
  type GetAccessTokenParams,
  type HipayCardGetResponseSuccess,
  type HipayCardAddResponseSuccess,
} from 'mn-hipay/types'

describe('hipay api test', () => {
  const config: HipayConfig = {
    baseURL: import.meta.env.VITE_HIPAY_API_URL ?? 'https://test.hipay.mn',
    client_id: import.meta.env.VITE_HIPAY_ENTITY_ID ?? 'hoge',
    client_secret: import.meta.env.VITE_HIPAY_CLIENT_SECRET ?? 'fuga',
    code: import.meta.env.VITE_HIPAY_AUTH_CODE,
    version: 'v2',
  }

  const hipay = createHipay(config)

  it('can get accessToken & can not get accessToken', async () => {
    const dummyAccessToken = 'hogefuga'
    const dummyExpires = dayjs().add(1, 'hour').unix()

    server.use(
      http.post(`${config.baseURL}/${config.version}/auth/token`, async ({ request }) => {
        const body = (await request.json()) as GetAccessTokenParams

        if (body.client_id === config.client_id && body.client_secret === config.client_secret) {
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

  it('does not load accessToken if it is fresh', async () => {
    const dummyAccessToken = 'hogefuga'
    const dummyExpires = dayjs().add(1, 'hour').unix()
    let tokenApiLoadCount = 0

    server.use(
      http.post(`${config.baseURL}/${config.version}/auth/token`, () => {
        tokenApiLoadCount += 1
        return HttpResponse.json<HipayAccessTokenResponseSuccess>({
          access_token: `${dummyAccessToken}${tokenApiLoadCount}`,
          code: 1,
          expires: dummyExpires,
        })
      }),
      http.get(`${config.baseURL}/${config.version}/card/get/00000000`, () => {
        return HttpResponse.json<Partial<HipayCardGetResponseSuccess>>({
          code: 1,
          cardId: '00000000',
        })
      }),
    )

    await hipay.loadAccessToken()
    await hipay.getCard({ cardId: '00000000' })
    expect(tokenApiLoadCount).toBe(1)
  })

  it('does load accessToken if it is expired', async () => {
    const dummyAccessToken = 'hogefuga'
    let tokenApiLoadCount = 0

    server.use(
      http.post(`${config.baseURL}/${config.version}/auth/token`, () => {
        tokenApiLoadCount += 1
        return HttpResponse.json<HipayAccessTokenResponseSuccess>({
          access_token: `${dummyAccessToken}${tokenApiLoadCount}`,
          code: 1,
          expires: dayjs().add(1, 'hour').unix(),
        })
      }),
      http.get(`${config.baseURL}/${config.version}/card/get/00000000`, () => {
        return HttpResponse.json<Partial<HipayCardGetResponseSuccess>>({
          code: 1,
          cardId: '00000000',
        })
      }),
    )

    hipay.resetToken()
    await hipay.getCard({ cardId: '00000000' })
    expect(tokenApiLoadCount).toBe(1)
  })

  it('test with actual server', async () => {
    if (!import.meta.env.VITE_HIPAY_ENTITY_ID) {
      expect(false).toBe(false)
      return
    }

    server.close()

    const token = await hipay.getAccessToken()

    expectTypeOf(token).toEqualTypeOf<HipayAccessTokenResponseSuccess>()
  })

  it('can add card', async () => {
    if (!import.meta.env.VITE_HIPAY_ENTITY_ID) {
      expect(false).toBe(false)
      return
    }

    server.close()

    try {
      const card = await hipay.addCard({
        customer_id: '1111222233334444',
        redirect_uri: '',
        return_uri: 'https://localhost/return',
        entityId: import.meta.env.VITE_HIPAY_ENTITY_ID,
      })
      expectTypeOf(card).toEqualTypeOf<HipayCardAddResponseSuccess>()
    } catch (error) {
      const err = error as HipayError
      expect(err).toBeInstanceOf(HipayError)
      expect(err.title).toBe(HipayErrorTitle.cardAdd)
      console.warn({ title: err.title, ...err.responseData })
    }
  })

  it('can get card', async () => {
    if (!import.meta.env.VITE_HIPAY_ENTITY_ID) {
      expect(false).toBe(false)
      return
    }

    server.close()

    try {
      const card = await hipay.getCard({ cardId: '00000000' })
      expectTypeOf(card).toEqualTypeOf<HipayCardGetResponseSuccess>()
    } catch (error) {
      const err = error as HipayError
      expect(err).toBeInstanceOf(HipayError)
      expect(err.title).toBe(HipayErrorTitle.cardGet)
      console.warn({ title: err.title, ...err.responseData })
    }
  })
})
