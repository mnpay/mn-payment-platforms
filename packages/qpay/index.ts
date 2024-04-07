import axios from 'axios'
import { type QpayConfig } from './types'
import { QpayApiVersion, qpayDefaultBaseUrl } from './constants'
import { createAuthenticate } from './requests'
import { type Store, type StoreConfig } from './definitions'

/**
 * https://developer.qpay.mn
 * QPay төлбөрийн үйлчилгээнд өөрийн үйлчилгээг холбон төлбөр тооцоогоо
 * худалдан QPay QR кодоор авах боломжыг мерчантуудад олгох зорилготой бүтээгдсэн платформ юм.
 * Мерчант өөрийн бүтээгдэхүүн үйлчилгээг дараах алхмын дагуу QPay системд нэмэх боломжтой.
 * Бидэнтэй холбогдож ID болон OAuth 2.0 (clientID, хэрэглэгчийн нууц үг) нууцлалаа авна. (Холбоо барих имэйл хаяг: info@qpay.mn)
 */
export const useQpay = (config: QpayConfig) => {
  const version = config.version ?? QpayApiVersion.v2
  const baseUrl = `${config.baseUrl ?? qpayDefaultBaseUrl}/${version}`

  const api = axios.create({
    baseURL: baseUrl,
  })

  const store: Store = {
    baseUrl,
    accessToken: config.accessToken,
    expiresIn: config.expiresIn,
  }

  const storeConfig: StoreConfig = {
    store,
    setStore: (value) => {
      Object.assign(store, value)
    },
  }

  const authenticate = createAuthenticate(api, storeConfig)

  return {
    api,
    /**
     * ### Токен авах хүсэлт
     * Access token авах API.
     * `{ username: client_id, password: client_secret }`-ийг qPay -ээс авна.
     */
    authenticate,
  }
}
