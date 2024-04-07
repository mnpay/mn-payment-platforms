/**
 * Татвар
 */
export interface Tax {
  /**
   * Татварын код
   * Тип: string
   * Хэрэглэхгүй
   * Жишээ: VAT
   */
  tax_code?: string
  /**
   * Утга
   * Тип: string
   * Хэрэглэхгүй
   * Урт ихдээ: 100
   * Жишээ: НӨАТ
   */
  description: string
  /**
   * Дүн
   * Тип: number
   * Хэрэглэхгүй
   * Жишээ: 100
   */
  amount: number
  /**
   * Хотын татвар
   * Тип: number
   * Хэрэглэхгүй
   * Жишээ: None
   */
  city_tax?: number
  /**
   * Тэмдэглэл
   * Тип: string
   * Хэрэглэхгүй
   * Жишээ: тэмдэглэл
   */
  note?: string
}
