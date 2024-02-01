import { dayjs } from '@packages/core'
import { HipayCurrency, HipayRequestName, HipayUrl } from 'mn-hipay/constants'
import { type HipayDefaultConfig } from 'mn-hipay/definitions'
import { createHipayRequestHandler } from 'mn-hipay/helpers'
import { getHipayUrlPath } from 'mn-hipay/lib'
import { type GetAccessTokenParams, type GetAccessTokenParamsApi } from 'mn-hipay/types'
import axios from 'axios'

export * from 'mn-hipay/types'
export * from 'mn-hipay/helpers'
export * from 'mn-hipay/configs'
export * from 'mn-hipay/constants'
export * from 'mn-hipay/lib'
export * from 'mn-hipay/errors'

declare module 'axios' {
  interface AxiosRequestConfig {
    version?: 'v2'
    expires?: number
    accessToken?: string
  }
}

// reference https://developers.hipay.mn/token
export const createHipay = (config: HipayDefaultConfig) => {
  const { baseURL } = config
  const api = axios.create({ baseURL, version: config.version })

  const _getAccessToken = createHipayRequestHandler(HipayRequestName.accessToken, api, (data) => {
    return {
      ...data,
      client_id: data?.client_id ?? config.client_id,
      client_secret: data?.client_secret ?? config.client_secret,
      code: data?.code ?? config.code,
      grant_type: data?.grant_type ?? 'authorization_code',
      redirect_uri: data?.redirect_uri ?? '',
    }
  })

  const getAccessToken = async (params?: GetAccessTokenParams) => {
    const token = await _getAccessToken(params ?? config)

    return token
  }

  const getCard = createHipayRequestHandler(HipayRequestName.cardGet, api)
  const getCheckout = createHipayRequestHandler(HipayRequestName.getCheckout, api)

  const addCard = createHipayRequestHandler(HipayRequestName.cardAdd, api, (data) => {
    return {
      ...data,
      entityId: data.entityId ?? config.client_id,
      redirect_uri: data.redirect_uri ?? '',
      return_uri: data.return_uri ?? '',
    }
  })

  const removeCard = createHipayRequestHandler(HipayRequestName.cardRemove, api)

  const checkout = createHipayRequestHandler(HipayRequestName.checkout, api, (data) => {
    return {
      ...data,
      entityId: data.entityId ?? config.client_id,
      currency: data.currency ?? HipayCurrency.mnt,
    }
  })

  const payment = createHipayRequestHandler(HipayRequestName.payment, api, (data) => {
    return {
      ...data,
      access_token: data.access_token ?? api.defaults.accessToken ?? '',
      entityId: data.entityId ?? config.client_id,
      ipaddress: data.ipaddress ?? '',
    }
  })

  const loadAccessToken = async (params?: GetAccessTokenParamsApi) => {
    const isFreshToken = dayjs().add(5, 'minutes').isBefore(api.defaults.expires)

    if (api.defaults.accessToken && isFreshToken) {
      return {
        access_token: api.defaults.accessToken,
        expires: api.defaults.accessToken,
      }
    }

    const { access_token: accessToken, expires } = await _getAccessToken(params ?? config)

    api.defaults.accessToken = accessToken
    api.defaults.expires = expires * 1000
    api.defaults.headers.Authorization = `Bearer ${accessToken}`

    return {
      access_token: api.defaults.accessToken,
      expires: api.defaults.expires,
    }
  }

  api.interceptors.request.use(
    async (requestConfig) => {
      if (!requestConfig.url?.startsWith(getHipayUrlPath(HipayUrl.accessToken, config))) {
        await loadAccessToken()
      }
      return requestConfig
    },
    async (error) => {
      return await Promise.reject(error)
    },
  )

  const getCardAddFormUrl = () => {
    return `${config.baseURL}/${config.version}/card/form`
  }

  return {
    /**
     * Хандалтын токен авах (get auth token)
     * Байгууллага системд хандахдаа хамгийн түрүүнд хийх үйлдэл гэж ойлгож болно.
     * Уг хүсэлтийн хариунд ирсэн хандалтын токений (access_token) тусламжтай дараа
     * дараагийн үйлдлийг хийх боломжтой болно.
     */
    getAccessToken,
    /**
     * Хандалтын токен дуудаж хадгалах. Нэг дуудсан тохиолдолд дахиж дуудах шаардлагагүй.
     * Байгууллага системд хандахдаа хамгийн түрүүнд хийх үйлдэл гэж ойлгож болно.
     * Уг хүсэлтийн хариунд ирсэн хандалтын токений (access_token) тусламжтай дараа
     * дараагийн үйлдлийг хийх боломжтой болно.
     */
    loadAccessToken,
    /**
     * Карт лавлах (Get card)
     * Карт нэмэх хүсэлт амжилттай болсоны дараагаар тухайн карт бүртгэлийн дугаараар картын дэлгэрэнгүй мэдээллийг авна.
     */
    getCard,
    /** Карт нэмэх (Card add)
     * Картын бүртгэлийн дугаар авах хүсэлт.
     * хүсэлтээс ирсэн {initId} утгаар форм авна.
     * Карт нэмэх хүсэлтийг дуудах Hi-Pay-ийн карт нэмэх цонх гарч ирэх бөгөөд тус цонхны тусламжтай
     * картын мэдээллийг оруулж и-пин кодоор баталгаажуулсны дараа карт нэмэгдэнэ. */
    addCard,
    /**
     * Карт хасах (Remove card)
     * Hipay системээр үүсгүүлсэн картын токенийг устгах зориулалттай.
     */
    removeCard,
    /**
     * Төлбөрийн нэхэмжлэх үүсгэх (Checkout)
     * Байгууллагын программаас барааны мэдээлэл болон худалдан авалтын мэдээллүүдийг Hi-Pay-руу илгээнэ.
     * Checkout сервисийг дуудахад амжилттай болсон тохиолдолд checkoutId (дахин давтагдахгүй) дугаар
     * буцаах бөгөөд уг дугаараар төлбөрийн гүйлгээ хийх хүсэлтийг илгээнэ.
     * Жич. Checkout утгыг Order буюу захиалга, нэхэмжлэх гэж ойлгоно.
     * @param {'MNT' | 'USD'} params.currency - default value = MNT
     */
    checkout,
    /**
     * Төлбөр нэхэмжлэх лавлах (get checkout)
     * Тухайн төлбөр төлөгдсөн эсэхийг нэхэмжлэхийн дугаар ашиглан лавлах
     * @param {string} params.checkoutId - Нэхэмжлэхийн (checkout) дугаар
     */
    getCheckout,
    /**
     * Төлбөрийн гүйлгээ хийх (Payment)
     * Төлбөрийн гүйлгээ хийх хүсэлтэд өмнө нь үүсгэсэн төлбөрийн нэхэмжлэхийг (checkout) төлөх үйлдэл хийгдэнэ.
     * Төлбөрийн гүйлгээний хүсэлтэд ашиглагдах токен талбарт Байгууллагын токен-ийг байршуулж ашиглана.
     */
    payment,
    /** Hi-Pay-ийн карт нэмэх цонх */
    getCardAddFormUrl,
  }
}
