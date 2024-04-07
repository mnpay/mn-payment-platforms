import axios from 'axios'
import { type QpayConfig } from './types'
import { QpayApiVersion, qpayDefaultBaseUrl } from './constants'
import {
  makeCancelInvoice,
  makeCancelPayment,
  makeCheckPayment,
  makeCreateAuthenticate,
  makeCreateInvoice,
  makeGetInvoice,
  makeGetPayment,
  makeGetPaymentList,
  makeRefreshToken,
} from './requests'
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
    ...config,
    baseUrl,
  }

  const storeConfig: StoreConfig = {
    store,
    setStore: (value) => {
      Object.assign(store, value)
    },
  }

  const authenticate = makeCreateAuthenticate(api, storeConfig)
  const refreshToken = makeRefreshToken(api, storeConfig)
  const createInvoice = makeCreateInvoice(api, storeConfig)
  const getInvoice = makeGetInvoice(api, storeConfig)
  const cancelInvoice = makeCancelInvoice(api, storeConfig)
  const getPayment = makeGetPayment(api, storeConfig)
  const checkPayment = makeCheckPayment(api, storeConfig)
  const cancelPayment = makeCancelPayment(api, storeConfig)
  const getPaymentList = makeGetPaymentList(api, storeConfig)

  return {
    api,
    /**
     * #### Токен авах хүсэлт
     * Access token авах API.
     * `{ username: client_id, password: client_secret }`-ийг qPay -ээс авна.
     */
    authenticate,
    /**
     * #### Access token шинэчлэн авах API.
     * refresh_token -ийг ашиглана.
     */
    refreshToken,
    /**
     * #### Төлбөрийн нэхэмжлэл үүсгэх.
     * `invoice_code` -ийг qPay -ээс олгоно.
     */
    createInvoice,
    /**
     * #### Үүсгэсэн нэхэмжлэлийн мэдээллийг харах
     * Query Parameter -д qPay invoice_id -ийг илгээнэ.
     */
    getInvoice,
    /**
     * #### Төлбөрийн нэхэмжлэл цуцлах
     * Query Parameter -д qPay invoice_id -ийг илгээнэ.
     */
    cancelInvoice,
    /**
     * #### Үүсгэсэн нэхэмжлэлийн мэдээллийг харах
     * Query Parameter -д qPay payment_id -ийг илгээнэ.
     */
    getPayment,
    /**
     * #### Төлбөр төлөгдсөн эсэхийг шалгах
     * Нэхэмжлэлийн төлбөр шалгах бол object_type=INVOICE
     */
    checkPayment,
    /**
     * #### Төлбөрийг цуцлах
     * Query Parameter -д qPay payment_id -ийг илгээнэ.
     */
    cancelPayment,
    /**
     * #### Төлбөр төлөлтийн жагсаалт авах
     * customer_id, card_terminal_id, p2p_terminal_id -ийн мэдээллийг qPay merchant web admin-аас эсвэл qPay -ээс авна.
     */
    getPaymentList,
  }
}
