import { Discount } from './discount'
import { Surcharge } from './surcharge'
import { Tax } from './tax'

/**
 * Мөрүүд
 */
export interface Line {
  /**
   * Байгууллагын дотоод барааны код
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 45
   * Жишээ: Product_01
   */
  sender_product_code?: string
  /**
   * БТҮК код
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 45
   * Жишээ: 83051
   */
  tax_product_code?: string
  /**
   * Мөрийн утга
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 255
   * Жишээ: Invoice description
   */
  line_description?: string
  /**
   * Мөрийн тоо хэмжээ
   * Тип: number
   * Хэрэглэхгүй
   * Жишээ: 1
   */
  line_quantity?: number
  /**
   * Нэгжийн үнэ
   * Тип: number
   * Хэрэглэхгүй
   * Жишээ: 10000
   */
  line_unit_price?: number
  /**
   * Тэмдэглэл
   * Тип: string
   * Хэрэглэхгүй
   * Жишээ: Note
   */
  note?: string
  /**
   * Хөнгөлөлт
   * Тип: array
   * Хэрэглэхгүй
   * Жишээ: []
   */
  discounts?: Discount[]
  /**
   * Нэмэлт төлбөр
   * Тип: array
   * Хэрэглэхгүй
   * Жишээ: []
   */
  surcharges?: Surcharge[]
  /**
   * Татвар
   * Тип: array
   * Хэрэглэхгүй
   * Жишээ: []
   */
  taxes?: Tax[]
}
