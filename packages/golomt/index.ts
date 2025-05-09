import axios from 'axios'
import {
  makeCheckTransactionRequest,
  makeCreateInvoiceRequest,
  makeInquiryRequest,
  makePayTransactionRequest,
  makeTokenCreationRequest,
  makeTokenConfirmationRequest,
  makeGetSettlementDetailsRequest,
} from './requests'
import { GolomtConfig } from './types'
import { golomtDefaultBaseUrl } from './constants'
import { onNotification } from './events'

export * from './types'
export * from './helpers'
export * from './constants'
export * from './schemas'

export const useGolomt = (config: GolomtConfig) => {
  const baseURL = `${config.endpoint ?? golomtDefaultBaseUrl}`
  const store: GolomtConfig = { ...config, endpoint: baseURL }

  const api = axios.create({
    baseURL,
  })

  api.interceptors.request.use(async (requestConfig) => {
    const accessToken = config.token

    if (accessToken) {
      requestConfig.headers.Authorization = `Bearer ${accessToken}`
    }

    return requestConfig
  })

  const createInvoice = makeCreateInvoiceRequest(api, store)
  const inquiry = makeInquiryRequest(api, store)
  const tokenConfirmation = makeTokenConfirmationRequest(api)
  const payTransaction = makePayTransactionRequest(api, store)
  const checkTransaction = makeCheckTransactionRequest(api, store)
  const tokenCreation = makeTokenCreationRequest(api)
  const getSettlementDetails = makeGetSettlementDetailsRequest(api)

  return {
    api,
    getSettlementDetails,
    createInvoice,
    inquiry,
    tokenConfirmation,
    payTransaction,
    checkTransaction,
    tokenCreation,
    onNotification,
  }
}
