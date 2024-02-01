import { type HipayCurrency } from 'mn-hipay/constants'
import { type CheckoutId, type HipayEntityId, type HipayResponseSuccess } from './core'

export interface CheckoutResponseItem {
  /** Бараа бүтээгдэхүүний дугаар (32 оронтой) */
  itemno: string
  /** Бараа бүтээгдэхүүний нэр (200 оронтой) */
  name: string
  /** Бараа бүтээгдэхүүний нэгж үнэ */
  price: number
  /** Бараа бүтээгдэхүүний тоо ширхэг */
  quantity?: number
  /** Бараа бүтээгдэхүүний брэнд нэр (50 оронтой) */
  brand?: string
  /** Хэмжих нэгж (ш ширхэг, литр, кг) (10 оронтой) */
  measure?: string
  /** НӨАТ дүн */
  vat?: number
  /** Хотын татвар */
  citytax?: number
}

export interface CheckoutParams {
  entityId?: HipayEntityId
  amount: number
  currency?: HipayCurrency
  item: CheckoutResponseItem[]
}

export interface GetCheckoutParams {
  checkoutId?: CheckoutId
}

export interface CheckoutParamsApi extends CheckoutParams {
  entityId: HipayEntityId
  currency: HipayCurrency
}

export interface HipayCheckoutResponseSuccess extends HipayResponseSuccess {
  /**  (32)	Хүсэлтийн дугаар */
  requestId: string
  checkoutId: CheckoutId
}

export interface HipayGetCheckoutResponseSuccess extends HipayResponseSuccess {
  /** Төлбөрийн үнийн дүн */
  amount: number
  /** Төлбөрийн валют */
  currency: string
  /** Нэхэмлэхийн төлөв {new: Шинэ, canceled: цуцалсан, paid: төлөлт хийгдсэн, expired:нэхэмжлэхийн хүчинтэй хугацаа дууссан, invalid: алдаатай нэхэмжлэх } */
  status: string
  /** Төлөв өөрчлөгдсөн огноо */
  status_date: string
  /** 32,36)	Paid Төлөвтэй үед Төлбөрийн гүйлгээний дугаар */
  paymentId: string
}
