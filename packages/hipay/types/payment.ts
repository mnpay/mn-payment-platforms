import { type HipayEntityId, type HipayResponseSuccess } from '@packages/hipay/types/core'

export interface PaymentParams {
  /** Байгууллагын код. */
  entityId?: HipayEntityId
  /** Картын токен */
  tokenId: string
  /** Хандалтын токен */
  access_token?: string
  /** Гүйлгээг нь хийх гэж буй өмнө нь үүсгэсэн нэхэмжлэхийн (checkout) дугаар */
  checkoutId: string
  /** Тухайн гүйлгээг хийж буй төхөөрөмжийн IPv4 хаяг байна. */
  ipaddress?: string
}

export interface PaymentParamsApi extends PaymentParams {
  /** Байгууллагын код. */
  entityId: HipayEntityId
  /** Картын токен */
  tokenId: string
  /** Хандалтын токен */
  access_token: string
  /** Гүйлгээг нь хийх гэж буй өмнө нь үүсгэсэн нэхэмжлэхийн (checkout) дугаар */
  checkoutId: string
  /** Тухайн гүйлгээг хийж буй төхөөрөмжийн IPv4 хаяг байна. */
  ipaddress: string
}

export interface HipayPaymentResponseSuccess extends HipayResponseSuccess {
  /** Төлбөр төлөх хүсэлт гаргасан хүсэлтийн дугаар */
  requestId: string
  /** Төлөгдсөн нэхэмжлэхийн (checkout) дугаар */
  checkoutId: string
  /** Төлбөрийн гүйлгээний дугаар */
  id: string
  /** Төлбөрийн хүсэлтийн дугаар */
  initId: string
  /** Гүйлгээний үнийн дүн */
  amount: number
  /** Худалдан авалтын валют */
  currency: string
  /** Байгууллагын код. */
  entityId: string
  /** Төлбөр төлөлтийн төрөл (ltxn, wtxn, db) Ltxn: Бэлнээр шууд төлсөн Wtxn: Wallet аар төлсөн Db: Картаар төлсөн */
  paymentType: string
  /** Гүйлгээ хийсэн огноо */
  paymentDate: string
  /** Гүйлгээний тайлбар /англи/ */
  desc_en: string
  /** Гүйлгээний тайлбар /монгол/ */
  desc_mn: string
}
