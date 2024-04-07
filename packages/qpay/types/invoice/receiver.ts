import { Address } from './address'

/**
 * Нэхэмжлэгч хүлээж авагчийн мэдээлэл
 */
export interface InvoiceReceiverData {
  /**
   * Нэхэмжлэгч хүлээж авагчийн регистр
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 20
   * Жишээ: TA89102712
   */
  register?: string
  /**
   * Нэхэмжлэгч хүлээж авагчийн нэр
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: Бат
   */
  name?: string
  /**
   * Нэхэмжлэгч хүлээн авагчийн И-мэйл
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 255
   * Жишээ: info@info.mn
   */
  email?: string
  /**
   * Нэхэмжлэгч хүлээн авагчийн утас
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 20
   * Жишээ: 99887766
   */
  phone?: string
  /**
   * Нэхэмжлэгч хүлээн авагчийн хаяг
   * Тип: object
   * Хэрэглэхгүй
   * Жишээ: { city: 'Ulaanbaatar', street: 'Peace Avenue' }
   */
  address?: Address
}
