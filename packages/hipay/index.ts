import { dayjs } from '@packages/core'
import { HipayCurrency, HipayRequestName, HipayUrl } from 'mn-hipay/constants'
import { createHipayRequestHandler } from 'mn-hipay/helpers'
import { getHipayUrlPath } from 'mn-hipay/lib'
import { type GetAccessTokenParams, type GetAccessTokenParamsApi } from 'mn-hipay/types'
import axios from 'axios'
import { type HipayStore, type HipayConfig } from 'mn-hipay/definitions'

export * from 'mn-hipay/types'
export * from 'mn-hipay/helpers'
export * from 'mn-hipay/configs'
export * from 'mn-hipay/constants'
export * from 'mn-hipay/lib'
export * from 'mn-hipay/errors'

// reference https://developers.hipay.mn/token
export const createHipay = (config: HipayConfig) => {
  const { baseURL } = config
  const api = axios.create({ baseURL })
  const store: HipayStore = {
    config,
  }

  const getNewAccessToken = createHipayRequestHandler(HipayRequestName.accessToken, api, store, (data) => {
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
    const token = await getNewAccessToken(params ?? config)

    return token
  }

  const getCard = createHipayRequestHandler(HipayRequestName.cardGet, api, store)
  const getCheckout = createHipayRequestHandler(HipayRequestName.getCheckout, api, store)
  const removeCard = createHipayRequestHandler(HipayRequestName.cardRemove, api, store)

  const addCard = createHipayRequestHandler(HipayRequestName.cardAdd, api, store, (data) => {
    return {
      ...data,
      entityId: data.entityId ?? config.client_id,
      redirect_uri: data.redirect_uri ?? '',
      return_uri: data.return_uri ?? '',
    }
  })

  const checkout = createHipayRequestHandler(HipayRequestName.checkout, api, store, (data) => {
    return {
      ...data,
      entityId: data.entityId ?? config.client_id,
      currency: data.currency ?? HipayCurrency.mnt,
    }
  })

  const payment = createHipayRequestHandler(HipayRequestName.payment, api, store, (data) => {
    return {
      ...data,
      access_token: data.access_token ?? store.token?.access_token ?? '',
      entityId: data.entityId ?? config.client_id,
      ipaddress: data.ipaddress ?? '',
    }
  })

  const loadAccessToken = async (params?: GetAccessTokenParamsApi) => {
    const isFreshToken = dayjs().add(5, 'minutes').isBefore(store.token?.expires)

    if (store.token?.access_token && isFreshToken) {
      return {
        access_token: store.token?.access_token,
        expires: store.token?.access_token,
      }
    }

    const { access_token: accessToken, expires } = await getNewAccessToken(params ?? config)

    store.token = {
      access_token: accessToken,
      expires: expires * 1000,
    }
  }

  api.interceptors.request.use(
    async (requestConfig) => {
      const accessTokenUrl = getHipayUrlPath(HipayUrl.accessToken, config)
      const isOtherThanAccessTokenUrl = !requestConfig.url?.startsWith(accessTokenUrl)

      if (isOtherThanAccessTokenUrl) {
        await loadAccessToken()

        if (store.token) {
          requestConfig.headers.Authorization = `Bearer ${store.token.access_token}`
        }
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

  const resetToken = () => {
    store.token = undefined
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
    resetToken,
  }
}
