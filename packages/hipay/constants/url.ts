export enum HipayUrl {
  accessToken = '/:version/auth/token',
  cardGet = '/:version/card/get/:cardId',
  cardAdd = '/:version/card/init',
  cardRemove = '/:version/card/remove/:cardId',
  payment = '/:version/payment',
  checkout = '/checkout',
  getCheckout = '/checkout/get/:checkoutId',
}
