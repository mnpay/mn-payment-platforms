import { type HipayRequestName } from 'mn-hipay/constants'
import {
  type CardGetParams,
  type CardRemoveParams,
  type HipayAccessTokenResponseSuccess,
  type HipayCardAddResponseSuccess,
  type HipayCardGetResponseSuccess,
  type HipayCardRemoveResponseSuccess,
  type HipayCheckoutResponseSuccess,
  type HipayPaymentResponseSuccess,
  type GetAccessTokenParamsApi,
  type CardAddParamsApi,
  type CheckoutParamsApi,
  type PaymentParamsApi,
  type GetAccessTokenParams,
  type CheckoutParams,
  type CardAddParams,
  type PaymentParams,
  type GetCheckoutParams,
  type HipayGetCheckoutResponseSuccess,
} from 'mn-hipay/types'

export interface RequestResponseConfig {
  [HipayRequestName.accessToken]: {
    params: GetAccessTokenParams
    response: HipayAccessTokenResponseSuccess
    axiosParams: GetAccessTokenParamsApi
  }
  [HipayRequestName.cardAdd]: {
    params: CardAddParams
    response: HipayCardAddResponseSuccess
    axiosParams: CardAddParamsApi
  }
  [HipayRequestName.cardGet]: {
    params: CardGetParams
    response: HipayCardGetResponseSuccess
    axiosParams: CardGetParams
  }
  [HipayRequestName.cardRemove]: {
    params: CardRemoveParams
    response: HipayCardRemoveResponseSuccess
    axiosParams: CardRemoveParams
  }
  [HipayRequestName.checkout]: {
    params: CheckoutParams
    response: HipayCheckoutResponseSuccess
    axiosParams: CheckoutParamsApi
  }
  [HipayRequestName.getCheckout]: {
    params: GetCheckoutParams
    response: HipayGetCheckoutResponseSuccess
    axiosParams: GetCheckoutParams
  }
  [HipayRequestName.payment]: {
    params: PaymentParams
    response: HipayPaymentResponseSuccess
    axiosParams: PaymentParamsApi
  }
}
