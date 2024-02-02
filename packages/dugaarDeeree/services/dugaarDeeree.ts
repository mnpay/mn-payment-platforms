import axios from 'axios'
import { DugaarDeereeUrl, apiBaseURL } from '@mnpay/dugaar-deeree/constants'
import { useExpiryToken } from '@mnpay/dugaar-deeree/lib'
import * as apis from '@mnpay/dugaar-deeree/apis'

/**
 * DIRECT CARRIER BILLING
 * “Direct Carrier Billing” нь хэрэглэгчдэд худалдан авалтынхаа төлбөрийг
 * гар утасныхаа төлбөр дээр гаргуулан, дараа сардаа хүүгүй, шимтгэлгүй төлөх
 * боломжийг олгодог үйлчилгээ юм.
 * @see https://merchant.mobicom.mn/docs/api
 */
export const useDugaarDeeree = ({
  baseURL = apiBaseURL,
  clientId,
  clientSecret,
}: {
  baseURL?: string
  clientId: string
  clientSecret: string
}) => {
  const api = axios.create({ baseURL })
  const { getNewExpiryTime, setNewExpiryTime, getIsExpired } = useExpiryToken()
  const getAccessToken = apis.createGetAccessToken(api)
  /** @param {string} data.isdn - phoneNumber */
  const checkCustomer = apis.createCheckCustomer(api)
  const purchaseInitiate = apis.createPurchaseInitiate(api)
  const purchaseConfirm = apis.createPurchaseConfirm(api)
  const checkTransaction = apis.createCheckTransaction(api)
  const checkStatement = apis.createCheckStatement(api)

  const authenticate = async () => {
    const expiryTime = getNewExpiryTime()
    const response = await getAccessToken({ clientId, clientSecret })
    setNewExpiryTime(expiryTime)

    return response
  }

  const authenticateIfTokenExpired = async () => {
    if (getIsExpired()) {
      await authenticate()
    }
  }

  api.interceptors.request.use(async (config) => {
    if (config.url !== DugaarDeereeUrl.authenticate) {
      await authenticateIfTokenExpired()
    }
    return config
  })

  return {
    api,
    getAccessToken,
    authenticate,
    getIsExpired,
    authenticateIfTokenExpired,
    checkCustomer,
    purchaseInitiate,
    purchaseConfirm,
    checkStatement,
    checkTransaction,
  }
}
