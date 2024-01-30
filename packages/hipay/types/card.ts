import { type HipayEntityId, type HipayResponseSuccess } from './core'

export interface CardGetParams {
  cardId: string
}

export interface CardAddParams {
  entityId?: HipayEntityId
  return_uri: string
  redirect_uri: string
  customer_id: string
}

export interface CardAddParamsApi extends CardAddParams {
  entityId: HipayEntityId
  return_uri: string
  redirect_uri: string
  customer_id: string
}

export interface CardRemoveParams {
  cardId: string
}

export interface HipayCardInitResponseSuccess extends HipayResponseSuccess {}
export interface HipayCardRemoveResponseSuccess extends HipayResponseSuccess {}

export interface HipayCardGetResponseSuccess extends HipayResponseSuccess {
  /** Картын токен */
  tokenId: string
  /** Картын бүртгэлийн дугаар */
  cardId: string
  /** Картын бин дугаар (6 орон) */
  bin: string
  /** Картын сүүлийн 4 орон */
  last4digits: string
  /** Карт эзэмшигчийн нэр (карт дээрх) */
  holder: string
  /** Хүчинтэй сар */
  expiryMonth: string
  /** Хүчинтэй огноо */
  expiryYear: string
  /** Картын брэнд */
  cardbrand: string
  /** Карт гаргагч банкны код */
  bankno: string
  /** Карт гаргагч банкны нэр */
  bankname: string
  /** TODO: Sura - check if this exists */
  removedate?: unknown
}

export interface HipayCardAddResponseSuccess extends HipayResponseSuccess {
  /** Картын бүртгэлийн дугаар */
  initId: string
}
