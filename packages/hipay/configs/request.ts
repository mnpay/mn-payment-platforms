import { HipayRequestName, HipayUrl, HipayErrorTitle } from 'mn-hipay/constants'

export const requestConfig = {
  [HipayRequestName.accessToken]: {
    method: 'post',
    url: HipayUrl.accessToken,
    dataTransferKey: 'data',
    errorTitle: HipayErrorTitle.accessToken,
  },
  [HipayRequestName.cardGet]: {
    method: 'get',
    url: HipayUrl.cardGet,
    dataTransferKey: 'pathParams',
    errorTitle: HipayErrorTitle.cardGet,
  },
  [HipayRequestName.cardAdd]: {
    method: 'post',
    url: HipayUrl.cardAdd,
    dataTransferKey: 'data',
    errorTitle: HipayErrorTitle.cardAdd,
  },
  [HipayRequestName.cardRemove]: {
    method: 'post',
    url: HipayUrl.cardRemove,
    dataTransferKey: 'pathParams',
    errorTitle: HipayErrorTitle.cardRemove,
  },
  [HipayRequestName.payment]: {
    method: 'post',
    url: HipayUrl.payment,
    dataTransferKey: 'data',
    errorTitle: HipayErrorTitle.payment,
  },
  [HipayRequestName.checkout]: {
    method: 'post',
    url: HipayUrl.checkout,
    dataTransferKey: 'data',
    errorTitle: HipayErrorTitle.checkout,
  },
  [HipayRequestName.getCheckout]: {
    method: 'get',
    url: HipayUrl.getCheckout,
    dataTransferKey: 'pathParams',
    errorTitle: HipayErrorTitle.getCheckout,
  },
} as const
